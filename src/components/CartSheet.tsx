import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ModuleRender } from "./ModuleRender";
import { useCart } from "@/hooks/useCart";
import { MODULES, COLORS } from "@/lib/constants";
import { computeItemPrice } from "@/lib/furniture-utils";

// Global cart instance
let globalCartActions: ReturnType<typeof useCart> | null = null;

export function CartSheet() {
  const cart = useCart();
  
  // Expose cart actions globally for backward compatibility
  if (typeof window !== 'undefined') {
    globalCartActions = cart;
    (window as any).addToCart = cart.addToCart;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-2xl relative">
          <ShoppingCart className="h-4 w-4" />
          {cart.items.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {cart.items.reduce((acc, item) => acc + item.qty, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu carrito</SheetTitle>
        </SheetHeader>
        <div className="mt-4 grid gap-4">
          {cart.items.length === 0 && (
            <div className="text-sm text-muted-foreground">Aún no has añadido productos.</div>
          )}
          {cart.items.map((it) => {
            const mod = MODULES.find((m) => m.id === it.moduleId)!;
            const unit = computeItemPrice(it.moduleId, it.front, it.sides);
            return (
              <div key={it.id} className="flex gap-3 border border-border rounded-xl p-3">
                <div className="w-24 rounded-lg overflow-hidden border border-border">
                  <ModuleRender moduleId={it.moduleId} front={it.front} sides={it.sides} />
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-medium">{mod.name}</div>
                  <div className="text-muted-foreground">
                    Frente: {COLORS.find((c) => c.id === it.front)?.label} · 
                    Laterales: {COLORS.find((c) => c.id === it.sides)?.label}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => cart.updateQty(it.id, -1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span>{it.qty}</span>
                    <Button variant="outline" size="icon" onClick={() => cart.updateQty(it.id, 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                    <div className="ml-auto font-semibold">${unit * it.qty} USD</div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Dimensiones: {mod.width}×{mod.height}×{mod.depth} cm
                  </div>
                  <div className="mt-2">
                    <Button variant="ghost" size="sm" onClick={() => cart.removeItem(it.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 border-t border-border pt-4 flex items-center justify-between">
          <div className="text-muted-foreground">Total</div>
          <div className="text-xl font-semibold">${cart.total} USD</div>
        </div>
        <div className="mt-4">
          <Button className="w-full rounded-2xl" disabled={cart.items.length === 0}>
            Continuar al checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}