import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MODULES, COLORS } from "@/lib/constants";
import { computeItemPrice } from "@/lib/furniture-utils";
import { ModuleRender } from "./ModuleRender";
import type { LineItem } from "@/lib/types";

export function CartSheet() {
  const [items, setItems] = useState<LineItem[]>([]);

  (window as any).addToCart = (li: LineItem) => {
    setItems((prev) => {
      const key = `${li.moduleId}-${li.front}-${li.sides}-${li.groupTag ?? ""}`;
      const existingIndex = prev.findIndex((p) => `${p.moduleId}-${p.front}-${p.sides}-${p.groupTag ?? ""}` === key);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], qty: copy[existingIndex].qty + li.qty };
        return copy;
      }
      return [...prev, { ...li, id: crypto.randomUUID() }];
    });
  };

  const total = items.reduce((acc, it) => acc + computeItemPrice(it.moduleId, it.front, it.sides) * it.qty, 0);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p)));
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

  // Agrupar visualmente por groupTag
  const groups = items.reduce<Record<string, LineItem[]>>((map, it) => {
    const key = it.groupTag ?? "unitaria";
    map[key] = map[key] || [];
    map[key].push(it);
    return map;
  }, {});

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-2xl relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {items.reduce((acc, item) => acc + item.qty, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
        </SheetHeader>

        <div className="mt-4 grid gap-6">
          {Object.entries(groups).length === 0 && <div className="text-sm text-muted-foreground">Aún no has añadido productos.</div>}

          {Object.entries(groups).map(([group, arr]) => (
            <div key={group} className="border border-border rounded-2xl p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{group === "unitaria" ? "Productos" : group}</div>
                <Badge variant="outline">{arr.length} ítem(s)</Badge>
              </div>
              <div className="mt-3 grid gap-3">
                {arr.map((it) => {
                  const mod = MODULES.find((m) => m.id === it.moduleId)!;
                  const unit = computeItemPrice(it.moduleId, it.front, it.sides);
                  return (
                    <div key={it.id} className="flex gap-3 border border-border rounded-xl p-3">
                      <div className="w-24 rounded-lg overflow-hidden border border-border">
                        <ModuleRender moduleId={it.moduleId} front={it.front} sides={it.sides} />
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="font-medium">{mod.name}</div>
                        <div className="text-muted-foreground">Frente: {COLORS.find((c) => c.id === it.front)?.label} · Laterales: {COLORS.find((c) => c.id === it.sides)?.label}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <Button variant="outline" size="icon" onClick={() => updateQty(it.id, -1)}><Minus className="h-3 w-3" /></Button>
                          <span>{it.qty}</span>
                          <Button variant="outline" size="icon" onClick={() => updateQty(it.id, 1)}><Plus className="h-3 w-3" /></Button>
                          <div className="ml-auto font-semibold">${unit * it.qty} USD</div>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">Dimensiones: {mod.width}×{mod.height}×{mod.depth} cm</div>
                        <div className="mt-2">
                          <Button variant="ghost" size="sm" onClick={() => removeItem(it.id)}>Eliminar</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
          <div className="text-muted-foreground">Total</div>
          <div className="text-xl font-semibold">${total} USD</div>
        </div>
        <div className="mt-4">
          <Button className="w-full rounded-2xl" disabled={items.length === 0}>Continuar al checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}