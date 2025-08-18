import { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/lib/types";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });

  const grouped = useMemo(() => {
    const map = new Map<string, CartItem[]>();
    cart.items.forEach(it => {
      const key = it.groupTag || "Sin grupo";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    });
    return Array.from(map.entries());
  }, [cart.items]);

  const onPay = () => {
    if (cart.items.length === 0) { 
      alert("Tu carrito está vacío."); 
      return; 
    }
    alert("Pago simulado. ¡Gracias por tu compra!");
    cart.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Revisa tu pedido e ingresa tus datos de envío.</p>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16 grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Summary */}
          <div className="space-y-4">
            {grouped.length === 0 ? (
              <Card className="rounded-2xl">
                <CardContent className="py-6 text-sm text-muted-foreground">Tu carrito está vacío.</CardContent>
              </Card>
            ) : (
              grouped.map(([group, items]) => (
                <Card key={group} className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base">{group}</CardTitle>
                    <CardDescription>{items.length} {items.length === 1 ? "producto" : "productos"}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {items.map(it => (
                      <div key={it.id} className="flex items-center justify-between border border-border rounded-xl px-3 py-2">
                        <div className="text-sm max-w-[60%]">{it.name}</div>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" onClick={() => cart.setQty(it.id, it.qty - 1)}>-</Button>
                          <div className="w-8 text-center text-sm">{it.qty}</div>
                          <Button size="icon" variant="outline" onClick={() => cart.setQty(it.id, it.qty + 1)}>+</Button>
                          <div className="w-20 text-right text-sm">${(it.price * it.qty).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base">Datos de envío</CardTitle>
                <CardDescription>Completa la información para el despacho.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Nombre completo</label>
                  <Input value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} className="mt-1"/>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Email</label>
                  <Input type="email" value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} className="mt-1"/>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Dirección</label>
                  <Input value={form.address} onChange={e => setForm(s => ({ ...s, address: e.target.value }))} className="mt-1"/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Ciudad</label>
                    <Input value={form.city} onChange={e => setForm(s => ({ ...s, city: e.target.value }))} className="mt-1"/>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Código postal</label>
                    <Input value={form.zip} onChange={e => setForm(s => ({ ...s, zip: e.target.value }))} className="mt-1"/>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-semibold">${cart.total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full rounded-2xl" onClick={onPay}>Pagar ahora (demo)</Button>
                </div>
                <button className="text-sm text-primary hover:underline mt-2" onClick={() => navigate("/")}>← Seguir comprando</button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}