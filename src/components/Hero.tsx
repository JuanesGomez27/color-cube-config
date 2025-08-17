import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  onJumpToAi: () => void;
}

export function Hero({ onJumpToAi }: HeroProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Tu mueble ideal, <span className="underline decoration-primary">diseñado por IA</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Sube una foto de tu espacio y deja que nuestra IA (Paintit) proponga una composición inicial con módulos A–E que se ajusta a tus medidas. Luego personaliza <em>solo</em> los colores.
        </p>
        <div className="mt-6 flex gap-3">
          <Button size="lg" onClick={onJumpToAi}>Diseñar con IA ahora</Button>
          <a href="#catalogo" className="text-sm underline self-center hover:text-primary transition-colors">
            Prefiero diseñar manual
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">Medidas reales</Badge>
          <Badge variant="secondary">Diseño inicial automático</Badge>
          <Badge variant="secondary">Personaliza colores</Badge>
        </div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="rounded-2xl border border-border p-4"
      >
        <div className="aspect-video rounded-xl bg-gradient-subtle" />
      </motion.div>
    </section>
  );
}