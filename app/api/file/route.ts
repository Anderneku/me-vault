import fs from "fs/promises";
import path from "path";
import { db } from "@/lib/database/db";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const FILE_DIR = path.join(process.cwd(), "uploads");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");

  // Display all files
  if (!filename) {
    const files = db
      .prepare("SELECT * FROM files ORDER BY uploaded_at DESC")
      .all() as FileRecord[];
    return NextResponse.json(files);
  }

  // Handle File Downloads
  const filepath = path.join(FILE_DIR, filename);
  const file = await fs.readFile(filepath);
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${filename}`,
    },
  });
}

export async function POST(req: Request) {
  const formData = req.formData();
  const file = (await formData).get("file") as File;

  // Write File
  const fileBytes = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileBytes);
  const filePath = path.join(FILE_DIR, file.name);
  await fs.writeFile(filePath, fileBuffer);

  // Update Database
  db.prepare(
    `
    INSERT INTO files (id, filename, uploaded_at, size, mime_type)
    VALUES (?, ?, ?, ?, ?)
  `
  ).run(
    `${file.name}-${randomUUID()}`,
    file.name,
    new Date().toISOString(),
    file.size,
    file.type
  );

  return NextResponse.json({ success: true }, { status: 200 });
}