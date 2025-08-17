import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Catalogo } from "@/components/Catalogo";
import { Configurador } from "@/components/Configurador";
import { AiDesignSection } from "@/components/AiDesignSection";
import type { LineItem, ModuleId } from "@/lib/types";

export default function Index() {
  const [selected, setSelected] = useState<LineItem>({
    id: "draft-1",
    moduleId: "A",
    qty: 1,
    front: "matte-white",
    sides: "light-wood",
  });

  const jumpToAi = () => {
    document.querySelector("#ai-design")?.scrollIntoView({ behavior: "smooth" });
  };

  const onAddToCart = (li: LineItem) => {
    (window as any).addToCart?.(li);
  };

  const onAcceptAiDesignToCart = (items: LineItem[], label: string) => {
    items.forEach((it) => (window as any).addToCart?.(it));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onJumpToAi={jumpToAi} />
      <main>
        <Hero onJumpToAi={jumpToAi} />

        {/* Flujo principal: IA */}
        <AiDesignSection onAcceptToCart={onAcceptAiDesignToCart} />

        {/* Alternativa manual */}
        <Catalogo onPick={(m: ModuleId) => setSelected({ ...selected, moduleId: m })} />
        <Configurador selected={selected} setSelected={setSelected} onAddToCart={onAddToCart} />

        {/* Cómo funciona */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Cómo funciona</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {["Sube tu foto y medidas", "IA propone un diseño", "Personaliza colores y compra"].map((step, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader><CardTitle>{i + 1}. {step}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Flujo simple y guiado. Siempre puedes usar el modo manual si prefieres.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
          <div className="mt-4 space-y-2 text-sm text-foreground">
            <p><strong>¿Puedo cambiar medidas o mover módulos?</strong> En el flujo con IA no; la IA ajusta por ti. Puedes usar el modo manual si lo prefieres.</p>
            <p><strong>¿Puedo combinar colores?</strong> Sí, frente y laterales por módulo.</p>
            <p><strong>¿Cómo se calcula el precio?</strong> Según módulo y acabados seleccionados, en tiempo real.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} modulo</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Políticas</a>
            <a href="#" className="hover:text-foreground transition-colors">Contacto</a>
          </div>
        </div>
      </footer>

      {/* Botón flotante CTA */}
      <div className="fixed bottom-4 right-4">
        <Button className="rounded-2xl shadow-medium" onClick={jumpToAi}>
          Diseñar con IA
        </Button>
      </div>
    </div>
  );
}