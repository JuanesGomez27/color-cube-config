import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Contacto() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <h1 className="text-3xl font-semibold">Contacto & Soporte</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">¿Quieres algo más personalizado? <span className="font-medium">Contáctanos</span> y te ayudamos a ajustar tu diseño.</p>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <form className="border border-border rounded-2xl p-5 grid gap-4" onSubmit={(e) => { e.preventDefault(); alert("Gracias, te contactaremos pronto."); }}>
              <div>
                <label className="text-xs text-muted-foreground">Nombre</label>
                <Input placeholder="Tu nombre" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <Input type="email" placeholder="tu@email.com" className="mt-1" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Mensaje</label>
                <Input placeholder="Cuéntanos qué necesitas…" className="mt-1" />
              </div>
              <Button className="rounded-2xl" type="submit">Enviar</Button>
            </form>

            <div className="border border-border rounded-2xl p-5">
              <div className="font-medium mb-2">O contáctanos por:</div>
              <ul className="text-sm text-foreground space-y-2">
                <li>Email: soporte@modulo.app</li>
                <li>WhatsApp: +57 300 000 0000</li>
                <li>Horario: Lun–Vie 9:00–18:00</li>
              </ul>
              <div className="mt-6 border border-border rounded-xl p-4">
                <div className="text-sm font-medium mb-1">¿Quieres algo más personalizado?</div>
                <div className="text-sm text-muted-foreground">Agenda una llamada y te proponemos un diseño a la medida.</div>
                <Button variant="outline" className="rounded-2xl mt-3" onClick={() => navigate("/")}>Empezar con IA</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}