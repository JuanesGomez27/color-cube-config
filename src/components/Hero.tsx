import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  onJumpToConfigurator: () => void;
}

export function Hero({ onJumpToConfigurator }: HeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Muebles modulares, <span className="underline decoration-primary">a tu medida</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Combina módulos A–E, cambia colores de frente y laterales, y obtén precio en tiempo real. Sin complicaciones.
        </p>
        <div className="mt-6 flex gap-3">
          <Button size="lg" onClick={onJumpToConfigurator}>Diseñar ahora</Button>
          <a href="#catalogo" className="text-sm underline self-center hover:text-primary transition-colors">
            Ver catálogo
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">Modularidad real</Badge>
          <Badge variant="secondary">5 colores</Badge>
          <Badge variant="secondary">Checkout rápido</Badge>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-2xl border border-border p-4"
      >
        <div className="aspect-video rounded-xl bg-gradient-hero" />
      </motion.div>
    </section>
  );
}