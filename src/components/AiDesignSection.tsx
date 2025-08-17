import { useState, useMemo } from "react";
import { RefreshCw, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MODULES, COLORS } from "@/lib/constants";
import { computeItemPrice } from "@/lib/furniture-utils";
import { ModuleRender } from "./ModuleRender";
import type { AiForm, ProposalItem, LineItem } from "@/lib/types";

export function AiDesignSection({ onAcceptToCart }: { onAcceptToCart: (items: LineItem[], label: string) => void }) {
  type Stage = "upload" | "suggested" | "personalize";
  const [stage, setStage] = useState<Stage>("upload");
  const [form, setForm] = useState<AiForm>({});
  const [proposal, setProposal] = useState<ProposalItem[] | null>(null);
  const [designLabel, setDesignLabel] = useState<string>("Diseño IA #1");

  const mockGenerate = () => {
    // Simula una respuesta IA con 3–4 módulos que "caben".
    // Por ahora fijo A, B, C, D (qty=1). Colores por defecto.
    const p: ProposalItem[] = [
      { moduleId: "A", qty: 1, front: "matte-white", sides: "light-wood" },
      { moduleId: "B", qty: 1, front: "matte-white", sides: "light-wood" },
      { moduleId: "C", qty: 1, front: "matte-white", sides: "light-wood" },
      { moduleId: "D", qty: 1, front: "matte-white", sides: "light-wood" },
    ];
    setProposal(p);
    setStage("suggested");
  };

  const redesign = () => {
    // Variación simple: cambia el orden y/o reemplaza uno por E si la profundidad lo permite (placeholder)
    const variants: ProposalItem[][] = [
      [
        { moduleId: "C", qty: 1, front: "matte-white", sides: "light-wood" },
        { moduleId: "A", qty: 1, front: "matte-white", sides: "light-wood" },
        { moduleId: "B", qty: 1, front: "matte-white", sides: "light-wood" },
      ],
      [
        { moduleId: "E", qty: 1, front: "matte-white", sides: "light-wood" },
        { moduleId: "D", qty: 1, front: "matte-white", sides: "light-wood" },
        { moduleId: "A", qty: 1, front: "matte-white", sides: "light-wood" },
      ],
      [
        { moduleId: "B", qty: 1, front: "matte-white", sides: "light-wood" },
        { moduleId: "B", qty: 1, front: "matte-white", sides: "light-wood" },
        { moduleId: "D", qty: 1, front: "matte-white", sides: "light-wood" },
      ],
    ];
    const v = variants[Math.floor(Math.random() * variants.length)];
    setProposal(v);
    setDesignLabel(`Diseño IA #${Math.floor(Math.random() * 90) + 10}`);
    setStage("suggested");
  };

  const toPersonalize = () => setStage("personalize");

  const totalPrice = useMemo(() => {
    if (!proposal) return 0;
    return proposal.reduce((acc, it) => acc + computeItemPrice(it.moduleId, it.front, it.sides) * it.qty, 0);
  }, [proposal]);

  return (
    <section id="ai-design" className="mx-auto max-w-6xl px-4 py-12 border-t border-border">
      <h2 className="text-2xl font-semibold">Diseño con IA</h2>
      <p className="text-muted-foreground mt-1">Flujo principal: sube foto y medidas, generamos un diseño inicial. Luego personaliza <em>solo</em> colores.</p>

      {stage === "upload" && (
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Foto del espacio</CardTitle></CardHeader>
            <CardContent>
              <label className="block border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground cursor-pointer hover:bg-accent/50 transition-colors">
                <input type="file" accept="image/*" className="hidden" />
                Arrastra y suelta una imagen o haz clic para seleccionar
              </label>
              <p className="text-xs text-muted-foreground mt-2">Formatos: JPG/PNG. Máx. 10 MB.</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader><CardTitle>Medidas del espacio</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Ancho (cm)</label>
                  <Input type="number" min={0} placeholder="Ej. 300" className="mt-1" value={form.width ?? ""} onChange={(e) => setForm({ ...form, width: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Alto (cm)</label>
                  <Input type="number" min={0} placeholder="Ej. 260" className="mt-1" value={form.height ?? ""} onChange={(e) => setForm({ ...form, height: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Profundidad (cm)</label>
                  <Input type="number" min={0} placeholder="Ej. 40" className="mt-1" value={form.depth ?? ""} onChange={(e) => setForm({ ...form, depth: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Notas (opcional)</label>
                <Input type="text" placeholder="Puerta izquierda, dejar libre zócalo, etc." className="mt-1" value={form.notes ?? ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="flex items-center gap-3">
                <Button className="rounded-2xl" onClick={mockGenerate}>Generar diseño con IA</Button>
                <span className="text-xs text-muted-foreground">La integración real con Paintit se conectará aquí.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {stage === "suggested" && proposal && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{designLabel}</h3>
              <Badge variant="outline">Propuesta de IA</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={redesign}><RefreshCw className="h-4 w-4 mr-2"/>Rediseñar</Button>
              <Button onClick={toPersonalize}><Check className="h-4 w-4 mr-2"/>Aceptar y personalizar colores</Button>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {proposal.map((it, idx) => (
              <Card key={idx} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base">{MODULES.find(m=>m.id===it.moduleId)!.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ModuleRender moduleId={it.moduleId} front={it.front} sides={it.sides} />
                  <div className="mt-2 text-sm text-muted-foreground">Cantidad: {it.qty}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <div className="text-muted-foreground">Total estimado</div>
            <div className="text-xl font-semibold">${proposal.reduce((acc, it) => acc + computeItemPrice(it.moduleId, it.front, it.sides) * it.qty, 0)} USD</div>
          </div>
        </div>
      )}

      {stage === "personalize" && proposal && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{designLabel} · Personaliza colores</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStage("suggested")}>Volver a propuesta</Button>
              <Button onClick={() => {
                const tag = `${designLabel}-${Date.now()}`;
                const items: LineItem[] = proposal.map((it) => ({
                  id: crypto.randomUUID(),
                  moduleId: it.moduleId,
                  qty: it.qty,
                  front: it.front,
                  sides: it.sides,
                  groupTag: tag,
                }));
                onAcceptToCart(items, designLabel);
              }}>
                Añadir diseño al carrito
              </Button>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposal.map((it, idx) => (
              <Card key={idx} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base">{MODULES.find(m=>m.id===it.moduleId)!.name}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="rounded-xl border border-border overflow-hidden">
                    <ModuleRender moduleId={it.moduleId} front={it.front} sides={it.sides} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Frente</label>
                      <Select value={it.front} onValueChange={(v) => {
                        const copy = [...proposal];
                        copy[idx] = { ...copy[idx], front: v as any };
                        setProposal(copy);
                      }}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Color frente" /></SelectTrigger>
                        <SelectContent>
                          {COLORS.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Laterales</label>
                      <Select value={it.sides} onValueChange={(v) => {
                        const copy = [...proposal];
                        copy[idx] = { ...copy[idx], sides: v as any };
                        setProposal(copy);
                      }}>
                        <SelectTrigger className="mt-1"><SelectValue placeholder="Color laterales" /></SelectTrigger>
                        <SelectContent>
                          {COLORS.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Precio</span>
                    <span className="font-semibold">${computeItemPrice(it.moduleId, it.front, it.sides) * it.qty} USD</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <div className="text-muted-foreground">Total</div>
            <div className="text-xl font-semibold">${totalPrice} USD</div>
          </div>
        </div>
      )}
    </section>
  );
}