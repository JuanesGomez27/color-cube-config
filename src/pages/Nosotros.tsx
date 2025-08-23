import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";

export default function Nosotros() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-semibold">Conócenos</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Nacimos para simplificar el diseño de muebles en casa. Vimos que elegir módulos, medidas y combinaciones podía ser abrumador.
            Por eso creamos una experiencia guiada por IA que parte de tu foto real y te propone una composición óptima.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10 grid md:grid-cols-3 gap-4">
          {[
            { t: "Diseño optimizado", d: "Composiciones que aprovechan tu espacio real." },
            { t: "Personalización simple", d: "Colores de frente y laterales en un par de clics." },
            { t: "Calidad moderna", d: "Muebles modulares con estética minimalista." },
          ].map((b, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="pt-6">
                <div className="font-medium">{b.t}</div>
                <div className="text-sm text-muted-foreground mt-1">{b.d}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14">
          <Card className="rounded-2xl">
            <CardContent className="py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xl font-semibold">¿Listo para ver tu espacio con IA?</div>
                <div className="text-muted-foreground">Empieza en segundos, solo necesitas una foto.</div>
              </div>
              <Button className="rounded-2xl" onClick={() => navigate("/")}>Diseñar con IA</Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}