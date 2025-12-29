import { HardDrive } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 mt-12 bg-muted/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 opacity-50">
          <HardDrive className="w-4 h-4" />
          <span className="text-sm font-medium">MeVault v0.0.1</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Hosted locally because I'm a Chad
        </p>
        <div className="flex gap-4">
          <Badge variant="outline" className="text-[10px] border-border/40">
            HTTP
          </Badge>
          <Badge variant="outline" className="text-[10px] border-border/40">
            SQL3
          </Badge>
        </div>
      </div>
    </footer>
  );
}
