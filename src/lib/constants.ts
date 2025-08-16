export const MODULES = [
  { id: "A", name: "Mueble A", width: 60, height: 31.8, depth: 31.8, basePrice: 120 },
  { id: "B", name: "Mueble B", width: 80, height: 31.8, depth: 31.8, basePrice: 135 },
  { id: "C", name: "Mueble C", width: 90, height: 31.8, depth: 31.8, basePrice: 145 },
  { id: "D", name: "Mueble D", width: 45, height: 31.8, depth: 31.8, basePrice: 110 },
  { id: "E", name: "Mueble E", width: 60, height: 52, depth: 45, basePrice: 170 },
] as const;

export const COLORS = [
  { id: "light-wood", label: "Madera clara" },
  { id: "matte-white", label: "Blanco mate" },
  { id: "graphite", label: "Grafito" },
  { id: "sand", label: "Arena" },
  { id: "sage", label: "Verde salvia" },
] as const;

export const FINISH_MULTIPLIER: Record<string, number> = {
  "light-wood": 1.05,
  "matte-white": 1.0,
  graphite: 1.08,
  sand: 1.03,
  sage: 1.06,
};