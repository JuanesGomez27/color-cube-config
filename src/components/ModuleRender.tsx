import { cn } from "@/lib/utils";
import { MODULES } from "@/lib/constants";
import type { ModuleId } from "@/lib/types";

interface ModuleRenderProps {
  moduleId: ModuleId;
  front: string;
  sides: string;
}

export function ModuleRender({ moduleId, front, sides }: ModuleRenderProps) {
  const bgFront = {
    "light-wood": "bg-wood-light",
    "matte-white": "bg-muted",
    "graphite": "bg-primary",
    "sand": "bg-accent",
    "sage": "bg-secondary",
  }[front];

  const bgSides = {
    "light-wood": "bg-wood-medium",
    "matte-white": "bg-card",
    "graphite": "bg-muted-foreground",
    "sand": "bg-accent/50",
    "sage": "bg-secondary/50",
  }[sides];

  const mod = MODULES.find((m) => m.id === moduleId)!;

  return (
    <div className="w-full aspect-[4/3] grid place-items-center">
      <div className={cn("w-4/5 rounded-xl shadow-soft grid", bgSides)} style={{ gridTemplateColumns: "1fr" }}>
        <div className={cn("h-28 m-4 rounded-lg border border-border", bgFront)} />
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        {mod.name} — {mod.width}×{mod.height}×{mod.depth} cm
      </div>
    </div>
  );
}