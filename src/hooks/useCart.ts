import { useState, useCallback } from "react";
import type { LineItem } from "@/lib/types";
import { computeItemPrice } from "@/lib/furniture-utils";

export function useCart() {
  const [items, setItems] = useState<LineItem[]>([]);

  const addToCart = useCallback((li: LineItem) => {
    setItems((prev) => {
      const key = `${li.moduleId}-${li.front}-${li.sides}`;
      const existingIndex = prev.findIndex((p) => `${p.moduleId}-${p.front}-${p.sides}` === key);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = { ...copy[existingIndex], qty: copy[existingIndex].qty + li.qty };
        return copy;
      }
      return [...prev, { ...li, id: crypto.randomUUID() }];
    });
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const total = items.reduce((acc, it) => acc + computeItemPrice(it.moduleId, it.front, it.sides) * it.qty, 0);

  return {
    items,
    addToCart,
    updateQty,
    removeItem,
    total
  };
}