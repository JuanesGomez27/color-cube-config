import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModuleRender } from "./ModuleRender";
import { MODULES } from "@/lib/constants";
import type { ModuleId } from "@/lib/types";

interface CatalogoProps {
  onPick: (m: ModuleId) => void;
}

export function Catalogo({ onPick }: CatalogoProps) {
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Catálogo</h2>
          <p className="text-muted-foreground">Explora los módulos base (dimensiones fijas).</p>
        </div>
        <a href="#configurador" className="text-sm underline hover:text-primary transition-colors">
          Ir al configurador
        </a>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map((m) => (
          <Card key={m.id} className="rounded-2xl hover:shadow-medium transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{m.name}</span>
                <Badge variant="outline">{m.width}×{m.height}×{m.depth} cm</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border overflow-hidden">
                <ModuleRender moduleId={m.id} front="matte-white" sides="light-wood" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-muted-foreground text-sm">Desde ${m.basePrice} USD</div>
                <Button size="sm" onClick={() => onPick(m.id)}>Personalizar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}