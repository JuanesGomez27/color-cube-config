import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCart();

  const Link = ({ to, children }: { to: string; children: any }) => (
    <button
      onClick={() => navigate(to)}
      className={`text-sm hover:text-foreground transition-colors ${location.pathname === to ? "font-semibold" : "text-muted-foreground"}`}
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="font-bold tracking-tight text-lg">modulo</button>
        <nav className="flex items-center gap-6">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contacto">Contacto</Link>
          
          <Button variant="outline" className="gap-2 rounded-2xl" onClick={() => navigate("/checkout")}>
            <ShoppingCart className="h-4 w-4" /> Carrito ({cart.items.length})
          </Button>
        </nav>
      </div>
    </header>
  );
}