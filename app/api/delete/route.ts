import fs from "fs/promises";
import { db } from "@/lib/database/db";
import { NextResponse } from "next/server";
import path from "path";

const FILE_DIR = path.join(process.cwd(), "uploads");

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const file_id = searchParams.get("file_id");
  const filename = searchParams.get("filename");

  // Delete from db
  db.prepare(`DELETE FROM files WHERE id = ?`).run(file_id);
  console.log(filename);
  // Delete actual file
  await fs.rm(path.join(FILE_DIR, filename!), { force: true });
  return NextResponse.json({ success: true }, { status: 200 });
}
