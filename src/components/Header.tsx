import { Button } from "@/components/ui/button";
import { CartSheet } from "./CartSheet";

interface HeaderProps {
  onJumpToConfigurator: () => void;
}

export function Header({ onJumpToConfigurator }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary" />
          <span className="font-semibold">modulo</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#catalogo" className="hover:text-foreground transition-colors">Catálogo</a>
          <a href="#configurador" className="hover:text-foreground transition-colors">Configurador</a>
          <a href="#ai-design" className="hover:text-foreground transition-colors">Diseño con IA</a>
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button onClick={onJumpToConfigurator} className="rounded-2xl">Diseñar mueble</Button>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}