import {
  Video,
  FileText,
  HardDrive,
  Music,
  ImageIcon,
  File,
} from "lucide-react";

export default function getFileIcon(mimeType?: string) {
  if (!mimeType) return <File className="w-4 h-4 text-green-400" />;

  if (mimeType.match(/^video/))
    return <Video className="w-4 h-4 text-blue-400" />;
  if (
    mimeType === "application/pdf" ||
    mimeType === "application/msword" ||
    mimeType === "text/plain"
  )
    return <FileText className="w-4 h-4 text-orange-400" />;
  if (
    mimeType === "application/zip" ||
    mimeType === "application/tar" ||
    mimeType === "application/x-7z-compressed"
  )
    return <HardDrive className="w-4 h-4 text-purple-400" />;
  if (mimeType.match(/^audio/))
    return <Music className="w-4 h-4 text-pink-400" />;
  if (mimeType.match(/^image/))
    return <ImageIcon className="w-4 h-4 text-green-400" />;

  // default fallback
  return <File className="w-4 h-4 text-green-400" />;
}
