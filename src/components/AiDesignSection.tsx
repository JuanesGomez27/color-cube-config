import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AiDesignSection() {
  return (
    <section id="ai-design" className="mx-auto max-w-6xl px-4 py-12 border-t border-border">
      <h2 className="text-2xl font-semibold">Diseño con IA (beta)</h2>
      <p className="text-muted-foreground mt-1">
        Sube una foto de tu espacio y agrega medidas. Pronto integraremos Paintit para sugerencias automáticas con módulos A–E.
      </p>

      <div className="mt-6 grid lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Foto del espacio</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="block border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground cursor-pointer hover:bg-accent/50 transition-colors">
              <input type="file" accept="image/*" className="hidden" />
              Arrastra y suelta una imagen o haz clic para seleccionar
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              Formatos aceptados: JPG, PNG. Máx. 10 MB.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Medidas del espacio</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Ancho (cm)</label>
                <Input type="number" min={0} placeholder="Ej. 300" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Alto (cm)</label>
                <Input type="number" min={0} placeholder="Ej. 260" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Profundidad (cm)</label>
                <Input type="number" min={0} placeholder="Ej. 40" className="mt-1" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Notas (opcional)</label>
              <Input 
                type="text" 
                placeholder="Ej. Dejar libre el zócalo, puerta a la izquierda, etc." 
                className="mt-1" 
              />
            </div>
            <div className="flex items-center gap-3">
              <Button className="rounded-2xl" disabled>
                Enviar a IA (próximamente)
              </Button>
              <span className="text-xs text-muted-foreground">
                La integración con Paintit estará en la siguiente versión.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}