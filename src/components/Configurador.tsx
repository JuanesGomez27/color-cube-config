import { useMemo } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ModuleRender } from "./ModuleRender";
import { MODULES, COLORS } from "@/lib/constants";
import { computeItemPrice } from "@/lib/furniture-utils";
import type { LineItem, ModuleId } from "@/lib/types";

interface ConfiguradorProps {
  selected: LineItem;
  setSelected: (li: LineItem) => void;
  onAddToCart: (li: LineItem) => void;
}

export function Configurador({ selected, setSelected, onAddToCart }: ConfiguradorProps) {
  const price = useMemo(() => 
    computeItemPrice(selected.moduleId, selected.front, selected.sides) * selected.qty, 
    [selected]
  );

  return (
    <section id="configurador" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl font-semibold">Configurador (manual)</h2>
      <p className="text-muted-foreground">
        Alternativa para usuarios avanzados. En el flujo principal, la IA diseña por ti.
      </p>

      <div className="mt-6 grid lg:grid-cols-2 gap-8">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Vista previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-hidden">
              <ModuleRender moduleId={selected.moduleId} front={selected.front} sides={selected.sides} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Opciones</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Módulo</label>
                <Select 
                  value={selected.moduleId} 
                  onValueChange={(v) => setSelected({ ...selected, moduleId: v as ModuleId })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {MODULES.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Cantidad</label>
                <div className="mt-1 flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setSelected({ ...selected, qty: Math.max(1, selected.qty - 1) })}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    className="w-16 text-center" 
                    value={selected.qty} 
                    onChange={(e) => setSelected({ ...selected, qty: Math.max(1, parseInt(e.target.value || "1")) })}
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setSelected({ ...selected, qty: selected.qty + 1 })}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Frente</label>
                <Select 
                  value={selected.front} 
                  onValueChange={(v) => setSelected({ ...selected, front: v as any })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Color frente" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Laterales</label>
                <Select 
                  value={selected.sides} 
                  onValueChange={(v) => setSelected({ ...selected, sides: v as any })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Color laterales" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLORS.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <div className="text-sm text-muted-foreground">Subtotal</div>
                <div className="text-xl font-semibold">${price} USD</div>
              </div>
              <Button onClick={() => onAddToCart(selected)} className="rounded-2xl">
                <ShoppingCart className="h-4 w-4 mr-2" /> Añadir al carrito
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}