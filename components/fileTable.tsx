import getFileIcon from "@/app/helpers/getFileIcon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Download,
  MoreVertical,
  ImageIcon,
  Video,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export default function FileTable({ files }: { files: FileRecord[] }) {
  async function deleteFile(fileName: string, fileId: string) {
    await fetch(
      `/api/delete?file_id=${fileId}&filename=${encodeURIComponent(fileName)}`,
      {
        method: "DELETE",
      }
    );
  }

  return (
    <Card className="bg-card/50 border-border/40 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/40 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-6 py-4 font-bold">Name</th>
              <th className="px-6 py-4 font-bold">Size</th>
              <th className="px-6 py-4 font-bold">Modified</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {files.map((file, i) => (
              <tr
                key={i}
                className="hover:bg-primary/5 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg bg-secondary/50 group-hover:bg-background transition-colors`}
                    >
                      {getFileIcon(file.mime_type ?? "default")}
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors cursor-pointer">
                        {file.filename}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {file.mime_type === "video" && (
                          <Badge
                            variant="secondary"
                            className="text-[9px] px-1 h-3.5 bg-blue-500/10 text-blue-400 border-none"
                          >
                            4K
                          </Badge>
                        )}
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {file.mime_type}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {file.size}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {file.uploaded_at}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {file.mime_type === "video" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:bg-primary/10"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    <a
                      href={`/api/file?filename=${encodeURIComponent(
                        file.filename
                      )}`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => deleteFile(file.filename, file.id)}
                          className="gap-2 cursor-pointer text-destructive"
                        >
                          <Trash className="w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
