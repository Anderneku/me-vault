"use client";

import {
  FileText,
  Video,
  Upload,
  Download,
  MoreVertical,
  Search,
  HardDrive,
  Wifi,
  Play,
  Music,
  ImageIcon,
  FolderOpen,
  File,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Suspense, useEffect, useRef } from "react";

import { useState } from "react";
import { toast } from "sonner";
import getFileIcon from "./helpers/getFileIcon";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import FileTable from "@/components/fileTable";

export default function ServerDashboard() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState(
    "No File is being Uploaded"
  );

  const getFiles = () => {
    fetch("/api/file", {})
      .then((res) => res.json())
      .then(setFiles);
  };
  useEffect(() => {
    // Initial fetch
    getFiles();

    // Poll every 5 seconds
    const interval = setInterval(() => {
      getFiles();
    }, 5000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    hiddenInputRef.current?.click();
  }
  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] as File;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // XMLHttpRequest to Get Upload Progress
    const uploadPromise = new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = (event.loaded / event.total) * 100;
          setUploadProgress(percent);
        }
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          setUploadProgress(100);
          toast("File Uploaded Successfully!");
          setTimeout(() => setUploadProgress(0), 1000);
          resolve();
        } else {
          toast.error("Upload Failed!");
          reject(new Error("Upload Failed!"));
        }
      };
      xhr.onerror = () => {
        toast.error("Error Occurred During Upload!");
        reject(new Error("Upload Error!"));
      };
      xhr.open("POST", "/api/file");
      xhr.send(formData);

      // WON'T BE NEEDING THIS ANYMORE IG
      // await fetch("/api/file", {
      //   method: "POST",
      //   body: formData,
      // });
    });
    uploadPromise.then(() => getFiles()).catch((err) => console.error(err));
  }

  return (
    <Suspense fallback={null}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        {/* Navigation */}
        <NavBar />

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Hero Section / Upload */}
          <section className="w-full">
            <Card className="lg:col-span-2 bg-card/50 border-border/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Center
                </CardTitle>
                <CardDescription>
                  Upload files to host them on your local network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border/60 rounded-xl p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all group cursor-pointer bg-muted/5">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Click to upload a file</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Maximum file size: ♾️
                    </p>
                  </div>

                  <input
                    onChange={uploadFile}
                    className="hidden"
                    type="file"
                    name="file_input"
                    ref={hiddenInputRef}
                  />
                  <Button
                    onClick={openFilePicker}
                    size="sm"
                    className="mt-2 font-semibold"
                  >
                    Select File
                  </Button>
                </div>
                {/* Active Upload Mock */}
                <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border/40 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium flex items-center gap-2">
                      <File className="w-4 h-4 text-primary" />
                      {currentUpload}
                    </span>
                    <span className="text-muted-foreground">
                      {uploadProgress}%
                    </span>
                  </div>
                  <Progress value={uploadProgress} className="h-1.5" />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Browser Section */}
          <section className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Recent Files
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    className="pl-9 bg-secondary/30 border-border/40 focus:ring-primary/20"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 border-border/40 bg-transparent"
                >
                  <FolderOpen className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <FileTable files={files} />
          </section>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
}
