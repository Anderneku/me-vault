import { HardDrive, Wifi } from "lucide-react";
import { Button } from "./ui/button";

export default function NavBar(){
    return(
        <nav className="border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <HardDrive className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight">MeVault</h1>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Client
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#" className="text-foreground transition-colors">
                Explorer
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Streaming
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Settings
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 border-border/50 bg-transparent"
              >
                <Wifi className="w-4 h-4" />
                Local Only
              </Button>
            </div>
          </div>
        </nav>
    )
}