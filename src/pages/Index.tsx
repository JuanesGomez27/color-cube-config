import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import heroImage from "@/assets/hero-furniture.jpg";

// --- Datos base (reglas del proyecto) ---
// Sólo podemos usar los módulos A–E con medidas fijas. No se cambian dimensiones ni diseño.
const MODULES = [
  { id: "A", name: "Mueble A", width: 60, height: 31.8, depth: 31.8, basePrice: 120 },
  { id: "B", name: "Mueble B", width: 80, height: 31.8, depth: 31.8, basePrice: 135 },
  { id: "C", name: "Mueble C", width: 90, height: 31.8, depth: 31.8, basePrice: 145 },
  { id: "D", name: "Mueble D", width: 45, height: 31.8, depth: 31.8, basePrice: 110 },
  { id: "E", name: "Mueble E", width: 60, height: 52, depth: 45, basePrice: 170 },
] as const;

type ModuleId = typeof MODULES[number]["id"];

const COLORS = [
  { id: "light-wood", label: "Madera clara" },
  { id: "matte-white", label: "Blanco mate" },
  { id: "graphite", label: "Grafito" },
  { id: "sand", label: "Arena" },
  { id: "sage", label: "Verde salvia" },
] as const;

// Reglas simples de recargo por acabado (ejemplo): frente y laterales pueden combinarse
const FINISH_MULTIPLIER: Record<string, number> = {
  "light-wood": 1.05,
  "matte-white": 1.0,
  graphite: 1.08,
  sand: 1.03,
  sage: 1.06,
};

// --- Utilidades ---
function classNames(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

// --- Tipos ---
interface LineItem {
  id: string; // unique line id
  moduleId: ModuleId;
  qty: number;
  front: typeof COLORS[number]["id"];
  sides: typeof COLORS[number]["id"];
}

// Precio calculado según módulo + acabados
function computeItemPrice(moduleId: ModuleId, front: string, sides: string) {
  const mod = MODULES.find((m) => m.id === moduleId)!;
  const base = mod.basePrice;
  const multiplier = (FINISH_MULTIPLIER[front] ?? 1) * (FINISH_MULTIPLIER[sides] ?? 1);
  return Math.round(base * multiplier);
}

// Mini placeholder visual para los renders (en producción, reemplazar por imágenes reales de los renders A–E)
function ModuleRender({ moduleId, front, sides }: { moduleId: ModuleId; front: string; sides: string }) {
  const bgFront = {
    "light-wood": "bg-wood-light",
    "matte-white": "bg-background",
    graphite: "bg-muted",
    sand: "bg-accent",
    sage: "bg-accent/60",
  }[front];
  const bgSides = {
    "light-wood": "bg-wood-medium",
    "matte-white": "bg-muted",
    graphite: "bg-muted-foreground/20",
    sand: "bg-accent/60",
    sage: "bg-accent/40",
  }[sides];

  const mod = MODULES.find((m) => m.id === moduleId)!;

  return (
    <div className="w-full aspect-[4/3] grid place-items-center">
      <div className={classNames("w-4/5 rounded-2xl shadow-soft grid transition-all duration-300 hover:shadow-medium", bgSides)} style={{ gridTemplateColumns: "1fr" }}>
        <div className={classNames("h-28 m-4 rounded-xl border-2 border-border/50", bgFront)} />
      </div>
      <div className="text-xs text-muted-foreground mt-2 font-medium">{mod.name} — {mod.width}×{mod.height}×{mod.depth} cm</div>
    </div>
  );
}

// --- Componentes UI ---
function Header({ onJumpToConfigurator }: { onJumpToConfigurator: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary shadow-soft" />
          <span className="font-bold text-xl">modulo</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#catalogo" className="hover:text-foreground transition-colors">Catálogo</a>
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#inspiracion" className="hover:text-foreground transition-colors">Inspiración</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button onClick={onJumpToConfigurator} className="rounded-2xl shadow-soft">Diseñar mueble</Button>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}

function Hero({ onJumpToConfigurator }: { onJumpToConfigurator: () => void }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          Muebles modulares, <span className="underline decoration-primary decoration-4">a tu medida</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Combina módulos A–E, cambia colores de frente y laterales, y obtén precio en tiempo real. Sin complicaciones.
        </p>
        <div className="mt-8 flex gap-4">
          <Button size="lg" onClick={onJumpToConfigurator} className="rounded-2xl shadow-medium">Diseñar ahora</Button>
          <Button variant="outline" size="lg" className="rounded-2xl">
            <a href="#catalogo" className="text-sm">Ver catálogo</a>
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Badge variant="secondary" className="rounded-xl">Modularidad real</Badge>
          <Badge variant="secondary" className="rounded-xl">5 colores</Badge>
          <Badge variant="secondary" className="rounded-xl">Checkout rápido</Badge>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-3xl border shadow-medium overflow-hidden bg-gradient-card"
      >
        <img src={heroImage} alt="Muebles modulares modernos" className="w-full h-auto" />
      </motion.div>
    </section>
  );
}

function Catalogo({ onPick }: { onPick: (m: ModuleId) => void }) {
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Catálogo</h2>
          <p className="text-muted-foreground mt-2">Explora los módulos base (dimensiones fijas).</p>
        </div>
        <a href="#configurador" className="text-sm text-primary hover:underline">Ir al configurador</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MODULES.map((m, index) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="rounded-3xl border-2 hover:shadow-medium transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{m.name}</span>
                  <Badge variant="outline" className="rounded-xl">{m.width}×{m.height}×{m.depth} cm</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl border-2 overflow-hidden bg-background">
                  <ModuleRender moduleId={m.id} front="matte-white" sides="light-wood" />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-muted-foreground text-sm font-medium">Desde <span className="text-foreground font-bold text-lg">${m.basePrice}</span> USD</div>
                  <Button size="sm" onClick={() => onPick(m.id)} className="rounded-xl">Personalizar</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Configurador({
  selected,
  setSelected,
  onAddToCart,
}: {
  selected: LineItem;
  setSelected: (li: LineItem) => void;
  onAddToCart: (li: LineItem) => void;
}) {
  const price = useMemo(() => computeItemPrice(selected.moduleId, selected.front, selected.sides) * selected.qty, [selected]);

  return (
    <section id="configurador" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Configurador</h2>
        <p className="text-muted-foreground mt-2">Combina módulos A–E. Sólo cambia colores (frente/laterales). Las dimensiones no se modifican.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <Card className="rounded-3xl border-2 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-xl">Vista previa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border-2 overflow-hidden bg-background">
              <ModuleRender moduleId={selected.moduleId} front={selected.front} sides={selected.sides} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-2 shadow-soft bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-xl">Opciones</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Módulo</label>
                <Select value={selected.moduleId} onValueChange={(v) => setSelected({ ...selected, moduleId: v as ModuleId })}>
                  <SelectTrigger className="mt-2 rounded-xl"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    {MODULES.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Cantidad</label>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setSelected({ ...selected, qty: Math.max(1, selected.qty - 1) })} className="rounded-xl">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input className="w-16 text-center rounded-xl" value={selected.qty} onChange={(e) => setSelected({ ...selected, qty: Math.max(1, parseInt(e.target.value || "1")) })} />
                  <Button variant="outline" size="icon" onClick={() => setSelected({ ...selected, qty: selected.qty + 1 })} className="rounded-xl">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Frente</label>
                <Select value={selected.front} onValueChange={(v) => setSelected({ ...selected, front: v as any })}>
                  <SelectTrigger className="mt-2 rounded-xl"><SelectValue placeholder="Color frente" /></SelectTrigger>
                  <SelectContent>
                    {COLORS.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Laterales</label>
                <Select value={selected.sides} onValueChange={(v) => setSelected({ ...selected, sides: v as any })}>
                  <SelectTrigger className="mt-2 rounded-xl"><SelectValue placeholder="Color laterales" /></SelectTrigger>
                  <SelectContent>
                    {COLORS.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between py-6 border-t border-border">
              <div>
                <div className="text-sm text-muted-foreground">Subtotal</div>
                <div className="text-2xl font-bold text-primary">${price} USD</div>
              </div>
              <Button onClick={() => onAddToCart(selected)} className="rounded-2xl shadow-soft" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" /> Añadir al carrito
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// --- Carrito (Sheet lateral) ---
function CartSheet() {
  const [items, setItems] = useState<LineItem[]>([]);

  // Exponer un evento global simple para añadir desde el configurador
  (window as any).addToCart = (li: LineItem) => {
    setItems((prev) => {
      const key = `${li.moduleId}-${li.front}-${li.sides}`;
      const existingIndex = prev.findIndex((p) => `${p.moduleId}-${p.front}-${p.sides}` === key);
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-2xl relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs rounded-full">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-xl">Tu carrito</SheetTitle>
        </SheetHeader>
        <div className="mt-6 grid gap-4">
          {items.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <div className="text-sm text-muted-foreground">Aún no has añadido productos.</div>
            </div>
          )}
          {items.map((it) => {
            const mod = MODULES.find((m) => m.id === it.moduleId)!;
            const unit = computeItemPrice(it.moduleId, it.front, it.sides);
            return (
              <div key={it.id} className="flex gap-4 border border-border rounded-2xl p-4 bg-gradient-card">
                <div className="w-24 rounded-xl overflow-hidden border-2">
                  <ModuleRender moduleId={it.moduleId} front={it.front} sides={it.sides} />
                </div>
                <div className="flex-1 text-sm">
                  <div className="font-semibold text-foreground">{mod.name}</div>
                  <div className="text-muted-foreground mt-1">
                    Frente: {COLORS.find((c) => c.id === it.front)?.label} · Laterales: {COLORS.find((c) => c.id === it.sides)?.label}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => updateQty(it.id, -1)} className="h-8 w-8 rounded-lg">
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{it.qty}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQty(it.id, 1)} className="h-8 w-8 rounded-lg">
                      <Plus className="h-3 w-3" />
                    </Button>
                    <div className="ml-auto font-bold text-primary">${unit * it.qty} USD</div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Dimensiones: {mod.width}×{mod.height}×{mod.depth} cm</div>
                  <div className="mt-3">
                    <Button variant="ghost" size="sm" onClick={() => removeItem(it.id)} className="text-destructive hover:text-destructive">
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {items.length > 0 && (
          <>
            <div className="mt-8 border-t pt-6 flex items-center justify-between">
              <div className="text-muted-foreground font-medium">Total</div>
              <div className="text-2xl font-bold text-primary">${total} USD</div>
            </div>
            <div className="mt-6">
              <Button className="w-full rounded-2xl shadow-medium" size="lg">
                Continuar al checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default function Index() {
  const [selected, setSelected] = useState<LineItem>({
    id: "draft-1",
    moduleId: "A",
    qty: 1,
    front: "matte-white",
    sides: "light-wood",
  });

  const jumpToConfigurator = () => {
    document.querySelector("#configurador")?.scrollIntoView({ behavior: "smooth" });
  };

  const onAddToCart = (li: LineItem) => {
    (window as any).addToCart?.(li);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onJumpToConfigurator={jumpToConfigurator} />
      <main>
        <Hero onJumpToConfigurator={jumpToConfigurator} />
        <Catalogo onPick={(m) => setSelected({ ...selected, moduleId: m })} />
        <Configurador selected={selected} setSelected={setSelected} onAddToCart={onAddToCart} />

        {/* Cómo funciona */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-16 bg-muted/30">
          <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "Elige módulo(s)", desc: "Selecciona entre nuestros 5 módulos base con dimensiones fijas." },
              { step: "Personaliza colores", desc: "Combina colores para frente y laterales según tu estilo." },
              { step: "Compra y recibe", desc: "Proceso simple de checkout y entrega rápida en tu hogar." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="rounded-3xl border-2 shadow-soft bg-gradient-card text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
                      {i + 1}
                    </div>
                    <CardTitle className="text-xl">{item.step}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Inspiración */}
        <section id="inspiracion" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-center">Inspiración</h2>
          <p className="text-muted-foreground text-center mt-4 mb-8">Muy pronto: galería con diseños reales y "Copia este diseño".</p>
          <div className="rounded-3xl border-2 bg-gradient-card p-12 text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 mx-auto mb-6 flex items-center justify-center">
              <div className="text-3xl">🎨</div>
            </div>
            <p className="text-muted-foreground">Próximamente tendrás acceso a nuestra galería de inspiración con combinaciones reales de nuestros clientes.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "¿Puedo cambiar medidas?", a: "No. Las dimensiones son fijas por modelo A–E." },
              { q: "¿Puedo combinar colores?", a: "Sí, frente y laterales pueden ser distintos." },
              { q: "¿Cómo se calcula el precio?", a: "Según módulo y acabados seleccionados, en tiempo real." }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="rounded-2xl border shadow-soft bg-gradient-card">
                  <CardContent className="pt-6">
                    <div className="font-semibold text-foreground mb-2">{faq.q}</div>
                    <div className="text-muted-foreground">{faq.a}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-primary shadow-soft" />
              <span className="font-bold text-xl">modulo</span>
            </div>
            <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} modulo</div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Políticas</a>
              <a href="#" className="hover:text-foreground transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón flotante CTA */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button className="rounded-2xl shadow-medium" onClick={jumpToConfigurator} size="lg">
          Diseñar mi mueble
        </Button>
      </motion.div>
    </div>
  );
}