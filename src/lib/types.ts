import { MODULES, COLORS } from "./constants";

export type ModuleId = typeof MODULES[number]["id"];

export interface LineItem {
  id: string;
  moduleId: ModuleId;
  qty: number;
  front: typeof COLORS[number]["id"];
  sides: typeof COLORS[number]["id"];
}