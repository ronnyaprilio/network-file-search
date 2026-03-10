import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { connectDB } from "@/app/lib/mongodb";
import FileModel from "@/app/lib/models/File";
import { PDFParse } from 'pdf-parse';
import { pathToFileURL } from "url";
import ExcelJS, { Row, Worksheet, CellValue } from "exceljs";
import mammoth from "mammoth";
import PptxParser from "node-pptx-parser";
import { File } from "@/app/types/Files";
import { revalidatePath } from "next/cache";

PDFParse.setWorker(
  pathToFileURL(path.join(process.cwd(), "node_modules/pdf-parse/dist/worker/pdf.worker.mjs")).href
);

function normalizePDFPath(input: string) {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }
  return pathToFileURL(input).href;
}

async function extractContent(fullPath: string): Promise<string> {
  const ext = path.extname(fullPath).toLowerCase();
  try {
    if (ext === ".txt") {
      return fs.readFileSync(fullPath, "utf8");
    } else if (ext === ".pdf") {
      const parser = new PDFParse({ url: normalizePDFPath(fullPath) });
      const result = await parser.getText();
      return result.text;
    } else if (ext === ".xlsx") {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(fullPath);
      const texts: string[] = [];
      workbook.eachSheet((sheet: Worksheet) => {
        sheet.eachRow((row: Row) => {
          const values = Array.isArray(row.values) ? row.values : [];

          const line = values
            .map((v: CellValue | undefined) => (v ?? "").toString())
            .join(" ");

          texts.push(line);
        });
      });

      return texts.join("\n");
    } else if (ext === ".docx") {
      const result = await mammoth.extractRawText({
        path: fullPath
      });
      return result.value;
    } else if (ext === ".pptx") {
      const parser = new PptxParser(fullPath);

      const slides = await parser.extractText();

      slides.forEach(slide => {
        console.log("Slide:", slide.id);
        console.log(slide.text.join("\n"));
      });
      return slides.map(slide => slide.text.join("\n")).join("\n---\n");
    } else {
      try {
        return fs.readFileSync(fullPath, "utf8");
      } catch {
        return "";
      }
    }
  } catch (error) {
    console.error(`Error reading content for ${fullPath}:`, error);
    return "";
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

async function readFilesRecursively(dir: string, basePath: string = ""): Promise<File[]> {

  const files: File[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subFiles = await readFilesRecursively(
        fullPath,
        path.join(basePath, item)
      );

      files.push(...subFiles);
    } else {
      const relativePath = path.join(basePath, item).replace(/\\/g, "/");
      const content = await extractContent(fullPath);

      files.push({
        title: item,
        path: `/samples/${relativePath}`,
        size: formatFileSize(stat.size),
        modified: stat.mtime,
        content,
      });
    }
  }

  return files;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const samplesDir = path.join(process.cwd(), "public", "samples");

    if (!fs.existsSync(samplesDir)) {
      return NextResponse.json({ error: "Samples directory not found" }, { status: 404 });
    }

    const files = await readFilesRecursively(samplesDir);

    await FileModel.deleteMany({});
    const insertedFiles = await FileModel.insertMany(files);
    revalidatePath("/");
    return NextResponse.json({
      message: `Seeded ${insertedFiles.length} files`,
      files: insertedFiles,
    });
  } catch (error) {
    console.error("Error seeding files:", error);
    return NextResponse.json({ error: "Failed to seed files" }, { status: 500 });
  }
}