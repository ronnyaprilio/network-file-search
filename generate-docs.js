const fs = require("fs")
const path = require("path")
const PDFDocument = require("pdfkit")
const { Document, Packer, Paragraph } = require("docx")
const ExcelJS = require("exceljs")
const PptxGenJS = require("pptxgenjs")

const baseDir = path.join(__dirname, "public", "samples")

const documents = [
  { folder: "finance", name: "financial-report-2024", text: "Revenue increased due to growth in cloud infrastructure." },
  { folder: "finance", name: "quarterly-budget", text: "Budget planning for the next fiscal quarter." },
  { folder: "engineering", name: "system-architecture", text: "The platform uses Next.js, Express API and MongoDB." },
  { folder: "engineering", name: "cloud-migration-plan", text: "Migration plan for cloud infrastructure." },
  { folder: "engineering", name: "api-documentation", text: "API endpoints for document search and file download." },
  { folder: "hr", name: "employee-handbook", text: "Company policies and remote work guidelines." },
  { folder: "hr", name: "security-policy", text: "Security best practices for engineers." },
  { folder: "product", name: "product-roadmap", text: "Upcoming product features and releases." },
  { folder: "product", name: "innovation-strategy", text: "Encouraging experimentation with new technologies." },
  { folder: "support", name: "customer-feedback", text: "Customers requested faster document search." }
]

async function generate() {

  for (let doc of documents) {

    const folderPath = path.join(baseDir, doc.folder)

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    const content = `${doc.name}\n\n${doc.text}\n\nGenerated for document search demo.`

    fs.writeFileSync(path.join(folderPath, `${doc.name}.txt`), content)

    const pdf = new PDFDocument()
    pdf.pipe(fs.createWriteStream(path.join(folderPath, `${doc.name}.pdf`)))
    pdf.fontSize(16).text(doc.name)
    pdf.moveDown()
    pdf.fontSize(12).text(content)
    pdf.end()

    const docx = new Document({
      sections: [{ children: [new Paragraph(content)] }]
    })

    const buffer = await Packer.toBuffer(docx)
    fs.writeFileSync(path.join(folderPath, `${doc.name}.docx`), buffer)

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet("Data")
    sheet.addRow(["Title", "Description"])
    sheet.addRow([doc.name, doc.text])
    await workbook.xlsx.writeFile(path.join(folderPath, `${doc.name}.xlsx`))

    const pptx = new PptxGenJS()
    const slide = pptx.addSlide()
    slide.addText(doc.name, { x: 1, y: 1, fontSize: 24 })
    slide.addText(doc.text, { x: 1, y: 2, fontSize: 16 })
    await pptx.writeFile({ fileName: path.join(folderPath, `${doc.name}.pptx`) })
  }

  console.log("Files generated in public/samples")
}

generate()