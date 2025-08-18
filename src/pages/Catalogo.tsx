import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MODULES, COLORS } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/lib/types";

const COLOR_NAMES = ["Blanco", "Madera clara", "Gris", "Negro", "Arena"];

export default function Catalogo() {
  const navigate = useNavigate();
  const cart = useCart();
  const [openId, setOpenId] = useState<string | null>(null);
  const [sel, setSel] = useState<{ front: string; sides: string; qty: number }>({ 
    front: COLOR_NAMES[0], 
    sides: COLOR_NAMES[0], 
    qty: 1 
  });
  
  const current = MODULES.find(m => m.id === openId) || null;

  const addToCart = () => {
    if (!current) return;
    const item: CartItem = {
      id: `CAT-${current.id}-${sel.front}-${sel.sides}`,
      name: `${current.name} – Frente ${sel.front} / Laterales ${sel.sides}`,
      qty: sel.qty,
      price: current.basePrice,
      groupTag: "Compra por módulo"
    };
    cart.add(item);
    setOpenId(null);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-2">
          <h1 className="text-3xl font-semibold">Catálogo</h1>
          <p className="text-muted-foreground mt-2">Compra módulos individuales. Ideal si te gustó un módulo de tu diseño IA y quieres otro para otro espacio.</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => navigate("/")} className="text-sm text-primary hover:underline">Volver a Inicio (diseño con IA)</button>
            <Badge variant="secondary">Recomendado: usa IA en Inicio</Badge>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MODULES.map(m => (
              <Card key={m.id} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base">{m.name}</CardTitle>
                  <CardDescription>Desde ${m.basePrice} — {m.width}×{m.height}×{m.depth} cm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-video border border-border rounded-xl grid place-items-center text-sm text-muted-foreground">
                    Render {m.id}
                  </div>
                  <Button className="w-full rounded-2xl" onClick={() => { 
                    setOpenId(m.id); 
                    setSel({ front: COLOR_NAMES[0], sides: COLOR_NAMES[0], qty: 1 }); 
                  }}>
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Modal */}
        {current && (
          <div>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpenId(null)}></div>
            <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-background z-50 shadow-xl overflow-y-auto">
              <div className="p-5 border-b border-border">
                <div className="text-lg font-semibold">{current.name}</div>
                <div className="text-sm text-muted-foreground">{current.width}×{current.height}×{current.depth} cm</div>
              </div>
              <div className="p-5 space-y-4">
                <div className="aspect-video border border-border rounded-xl grid place-items-center text-sm text-muted-foreground">
                  Render {current.id}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Frente</label>
                    <Select value={sel.front} onValueChange={v => setSel(s => ({ ...s, front: v }))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Color frente" /></SelectTrigger>
                      <SelectContent>{COLOR_NAMES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Laterales</label>
                    <Select value={sel.sides} onValueChange={v => setSel(s => ({ ...s, sides: v }))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Color laterales" /></SelectTrigger>
                      <SelectContent>{COLOR_NAMES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr,auto] items-end gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Cantidad</label>
                    <Input type="number" min={1} value={sel.qty} onChange={e => setSel(s => ({ ...s, qty: Math.max(1, Number(e.target.value || 1)) }))} className="mt-1"/>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Subtotal</div>
                    <div className="font-semibold">${(current.basePrice * sel.qty).toFixed(2)}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="w-full rounded-2xl" onClick={addToCart}>Añadir al carrito</Button>
                  <Button variant="outline" className="w-full rounded-2xl" onClick={() => setOpenId(null)}>Cerrar</Button>
                </div>
                <button onClick={() => navigate("/")} className="text-sm text-primary hover:underline">¿Tienes un diseño IA? Copia colores desde Inicio</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}