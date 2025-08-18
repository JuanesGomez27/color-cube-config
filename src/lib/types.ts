import { MODULES, COLORS } from "./constants";

export type ModuleId = typeof MODULES[number]["id"];

export interface LineItem {
  id: string;
  moduleId: ModuleId;
  qty: number;
  front: typeof COLORS[number]["id"];
  sides: typeof COLORS[number]["id"];
  groupTag?: string; // etiqueta para agrupar en carrito (diseño IA)
}

export interface AiForm {
  width?: number; // cm
  height?: number; // cm
  depth?: number; // cm
  notes?: string;
}

export interface ProposalItem {
  moduleId: ModuleId;
  qty: number;
  front: typeof COLORS[number]["id"]; // editable en etapa de personalización
  sides: typeof COLORS[number]["id"]; // editable en etapa de personalización
}

export interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  meta?: any;
  groupTag?: string;
}