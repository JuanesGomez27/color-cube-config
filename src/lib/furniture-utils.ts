import { MODULES, FINISH_MULTIPLIER } from "./constants";
import type { ModuleId } from "./types";

export function computeItemPrice(moduleId: ModuleId, front: string, sides: string) {
  const mod = MODULES.find((m) => m.id === moduleId)!;
  const base = mod.basePrice;
  const multiplier = (FINISH_MULTIPLIER[front] ?? 1) * (FINISH_MULTIPLIER[sides] ?? 1);
  return Math.round(base * multiplier);
}