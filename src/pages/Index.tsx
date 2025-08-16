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
        <Catalogo onPick={(m: ModuleId) => setSelected({ ...selected, moduleId: m })} />
        <Configurador selected={selected} setSelected={setSelected} onAddToCart={onAddToCart} />
        <AiDesignSection />

        {/* Cómo funciona */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Cómo funciona</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {["Elige módulo(s)", "Personaliza colores", "Compra y recibe"].map((step, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader><CardTitle>{i + 1}. {step}</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Proceso simple en tres pasos. Nada de configuraciones complejas.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Inspiración */}
        <section id="inspiracion" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Inspiración</h2>
          <p className="text-muted-foreground">Muy pronto: galería con diseños reales y "Copia este diseño".</p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
          <div className="mt-4 space-y-2 text-sm text-foreground">
            <p><strong>¿Puedo cambiar medidas?</strong> No. Las dimensiones son fijas por modelo A–E.</p>
            <p><strong>¿Puedo combinar colores?</strong> Sí, frente y laterales pueden ser distintos.</p>
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
        <Button className="rounded-2xl shadow-medium" onClick={jumpToConfigurator}>
          Diseñar mi mueble
        </Button>
      </div>
    </div>
  );
}