import { useEffect, useMemo, useRef, useState } from "react";
import { Image as ImageIcon, Undo2, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { Header } from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import { MODULES, COLORS } from "@/lib/constants";

type FormState = { width?: string; height?: string; depth?: string; notes?: string };
type Stage = "upload" | "suggested" | "personalize";
const STORAGE_KEY = "modulo_ai_v1";
const STAGE_KEY = "modulo_ai_stage_v1";
const PREVIEW_KEY = "modulo_ai_preview_v1";

const COLOR_NAMES = ["Blanco", "Madera clara", "Gris", "Negro", "Arena"];

export default function Index() {
  const navigate = useNavigate();
  const cart = useCart();
  const [stage, setStage] = useState<Stage>(() => (localStorage.getItem(STAGE_KEY) as Stage) || "upload");
  const [form, setForm] = useState<FormState>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => localStorage.getItem(PREVIEW_KEY));
  const [loading, setLoading] = useState(false);
  const [suggestedModules, setSuggestedModules] = useState([...MODULES]);
  const [colorByModule, setColorByModule] = useState<Record<string, { front: string; sides: string }>>({});
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)); }, [form]);
  useEffect(() => { localStorage.setItem(STAGE_KEY, stage); }, [stage]);
  useEffect(() => { if (previewUrl) localStorage.setItem(PREVIEW_KEY, previewUrl); }, [previewUrl]);

  const setModuleColor = (id: string, part: "front" | "sides", value: string) =>
    setColorByModule(prev => ({ ...prev, [id]: { front: prev[id]?.front || COLOR_NAMES[0], sides: prev[id]?.sides || COLOR_NAMES[0], [part]: value } }));

  const handleGenerate = async () => {
    if (!previewUrl || !form.width || !form.height) { alert("Sube una foto y agrega al menos ancho y alto."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setStage("suggested");
  };
  const handleAcceptDesign = () => setStage("personalize");
  const handleCancel = () => setStage("upload");
  const handleRedesign = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setSuggestedModules([...MODULES].reverse());
    setLoading(false);
  };
  const addWholeDesignToCart = () => {
    const group = `Diseño IA (${form.width || "?"}×${form.height || "?"} cm)`;
    suggestedModules.forEach(m => {
      const clr = colorByModule[m.id] || { front: COLOR_NAMES[0], sides: COLOR_NAMES[0] };
      cart.add({
        id: `AI-${m.id}-${clr.front}-${clr.sides}`,
        name: `${m.name} – Frente ${clr.front} / Laterales ${clr.sides}`,
        qty: 1,
        price: m.basePrice,
        meta: { module: m.id, ...clr },
        groupTag: group
      });
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                Tu mueble ideal, <span className="underline decoration-dashed">diseñado por IA</span>
              </h1>
              <p className="text-muted-foreground mt-3">Sube una foto de tu espacio y deja que nuestra IA proponga un diseño optimizado con módulos A–E. Luego personalizas colores y compras.</p>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="secondary">Rápido</Badge>
                <Badge variant="secondary">Sin medidas complejas</Badge>
                <Badge variant="secondary">Personalización simple</Badge>
              </div>
              <div className="mt-5">
                <a href="#ai"><Button className="rounded-2xl gap-2"><Wand2 className="h-4 w-4"/> Diseñar con IA</Button></a>
              </div>
            </div>
            <div>
              <div className="aspect-video w-full rounded-2xl border bg-muted grid place-items-center">
                <span className="text-muted-foreground text-sm">Aquí pondremos un hero visual (imagen/video).</span>
              </div>
            </div>
          </div>
        </section>

        {/* DEMO Video */}
        <section className="mx-auto max-w-6xl px-4 pb-6">
          <Card className="rounded-2xl">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="text-xl font-semibold mb-2">Mira el proceso, es muy fácil</div>
                <div className="mx-auto max-w-3xl aspect-video rounded-xl border bg-muted grid place-items-center text-muted-foreground text-sm">
                  Placeholder video / imagen demo
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cómo funciona */}
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <h2 className="text-2xl font-semibold mb-4">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { t: "1) Sube tu foto", d: "Usamos tu imagen real del espacio para contextualizar." },
              { t: "2) Agrega medidas", d: "Ancho, alto y profundidad para ajustar el diseño." },
              { t: "3) Dinos qué quieres", d: "La IA propone el diseño; tú eliges colores y compras." },
            ].map((s) => (
              <Card key={s.t} className="rounded-2xl">
                <CardHeader><CardTitle className="text-base">{s.t}</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">{s.d}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* IA Section */}
        <section id="ai" className="mx-auto max-w-6xl px-4 pb-14">
          <h2 className="text-2xl font-semibold mb-3">Diseño con IA (beta)</h2>

          {/* UPLOAD */}
          {stage === "upload" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="rounded-2xl">
                <CardHeader><CardTitle>Tu foto</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <label className="block border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground cursor-pointer hover:bg-muted/50">
                    <input ref={fileRef} type="file" accept="image/*" className="hidden"
                           onChange={(e) => {
                             const f = e.target.files?.[0];
                             if (!f) return;
                             const url = URL.createObjectURL(f);
                             setPreviewUrl(url);
                           }}/>
                    <ImageIcon className="mx-auto h-8 w-8 mb-2" />
                    Arrastra y suelta una imagen o haz clic para seleccionar
                  </label>
                  {previewUrl ? <img src={previewUrl} alt="preview" className="rounded-lg border"/> : null}
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader><CardTitle>Medidas y notas</CardTitle></CardHeader>
                <CardContent className="grid gap-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div><label className="text-xs text-muted-foreground">Ancho (cm)</label><Input value={form.width || ""} onChange={e => setForm(v => ({ ...v, width: e.target.value }))} /></div>
                    <div><label className="text-xs text-muted-foreground">Alto (cm)</label><Input value={form.height || ""} onChange={e => setForm(v => ({ ...v, height: e.target.value }))} /></div>
                    <div><label className="text-xs text-muted-foreground">Profundidad (cm)</label><Input value={form.depth || ""} onChange={e => setForm(v => ({ ...v, depth: e.target.value }))} /></div>
                  </div>
                  <div><label className="text-xs text-muted-foreground">Dinos qué quieres (opcional)</label><Input value={form.notes || ""} onChange={e => setForm(v => ({ ...v, notes: e.target.value }))} placeholder="Ej. 4 módulos, dejar libre enchufes, tonos claros..." /></div>
                  <div className="flex items-center gap-3">
                    <Button className="rounded-2xl" onClick={handleGenerate} disabled={loading}>
                      {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generando…</> : "Generar diseño con IA"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SUGGESTED */}
          {stage === "suggested" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Tu espacio</CardTitle>
                    <CardDescription>{form.width || "?"} × {form.height || "?"} × {form.depth || "?"} cm</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {previewUrl
                      ? <img src={previewUrl} alt="preview" className="rounded-lg border"/>
                      : <div className="aspect-video grid place-items-center rounded-lg border bg-muted text-sm text-muted-foreground">Sube una imagen para ver el preview</div>}
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Propuesta de la IA</CardTitle>
                    <CardDescription>Combinación óptima de módulos A–E (mock)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {suggestedModules.map(m => (
                      <div key={m.id} className="flex items-center justify-between border border-border rounded-xl px-3 py-2">
                        <div className="text-sm">{m.name}</div>
                        <div className="text-sm text-muted-foreground">${m.basePrice}</div>
                      </div>
                    ))}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button variant="outline" className="gap-2" onClick={handleRedesign} disabled={loading}>
                        {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Undo2 className="h-4 w-4" />} Rediseñar
                      </Button>
                      <Button onClick={handleAcceptDesign}>Aceptar y personalizar</Button>
                      <Button variant="ghost" onClick={handleCancel}>Cancelar</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* PERSONALIZE */}
          {stage === "personalize" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Tu espacio</CardTitle>
                    <CardDescription>{form.width || "?"} × {form.height || "?"} × {form.depth || "?"} cm</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {previewUrl
                      ? <img src={previewUrl} alt="preview" className="rounded-lg border"/>
                      : <div className="aspect-video grid place-items-center rounded-lg border bg-muted text-sm text-muted-foreground">Sube una imagen para ver el preview</div>}
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="rounded-2xl">
                  <CardHeader><CardTitle>Personaliza colores</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {suggestedModules.map(m => {
                      const clr = colorByModule[m.id] || { front: COLOR_NAMES[0], sides: COLOR_NAMES[0] };
                      return (
                        <div key={m.id} className="border border-border rounded-xl p-3">
                          <div className="font-medium text-sm mb-2">{m.name}</div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-muted-foreground">Frente</label>
                              <Select value={clr.front} onValueChange={(v) => setModuleColor(m.id, "front", v)}>
                                <SelectTrigger className="mt-1"><SelectValue placeholder="Color frente" /></SelectTrigger>
                                <SelectContent>{COLOR_NAMES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Laterales</label>
                              <Select value={clr.sides} onValueChange={(v) => setModuleColor(m.id, "sides", v)}>
                                <SelectTrigger className="mt-1"><SelectValue placeholder="Color laterales" /></SelectTrigger>
                                <SelectContent>{COLOR_NAMES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => { addWholeDesignToCart(); navigate("/checkout"); }}>Añadir diseño al carrito</Button>
                      <Button variant="ghost" onClick={handleCancel}>Cancelar</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </section>

        {/* Nuestros proyectos */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-semibold mb-4">Nuestros proyectos</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video border border-border rounded-xl grid place-items-center text-sm text-muted-foreground bg-muted">
                Placeholder proyecto {i + 1}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground flex items-center justify-between">
          <div>© modulo</div>
          <div className="flex gap-4">
            <a href="/faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="/contacto" className="hover:text-foreground transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}