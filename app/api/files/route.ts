import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import FileModel from "../../lib/models/File";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const files = await FileModel.find({}).sort({ modified: -1 }).limit(5);
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}