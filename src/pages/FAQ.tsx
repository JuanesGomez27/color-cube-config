export default function FAQ() {
  const faqs = [
    { q: "¿Cómo funciona la IA?", a: "Subes una foto y medidas básicas; la IA propone una composición con nuestros módulos A–E. Luego eliges colores y compras." },
    { q: "¿Puedo mover módulos manualmente?", a: "El flujo principal es automático; si quieres, puedes comprar módulos individuales en el Catálogo." },
    { q: "¿Qué colores hay?", a: "Ofrecemos 5 colores: Blanco, Madera clara, Gris, Negro y Arena." },
    { q: "¿Hacen envíos?", a: "Sí. Verás el costo y tiempo estimado en el checkout (próximamente)." },
    { q: "¿Puedo devolver un producto?", a: "Sí, en estado original dentro de 15 días. Consulta políticas al finalizar la compra." },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-14">
          <h1 className="text-3xl font-semibold mb-4">Preguntas frecuentes</h1>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-border rounded-2xl p-4">
                <div className="font-medium">{f.q}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}