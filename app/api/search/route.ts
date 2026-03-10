import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import FileModel from "../../lib/models/File";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const query = request.nextUrl.searchParams.get("q") ?? "";

    if (!query) {
      return NextResponse.json({ files: [] });
    }

    const files = await FileModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ modified: -1 })
      .limit(20);

    return NextResponse.json({ files });

  } catch (error) {
    console.error("Search error:", error);

    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}