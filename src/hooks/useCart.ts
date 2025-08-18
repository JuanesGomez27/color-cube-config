import { useState, useCallback } from "react";
import type { CartItem } from "@/lib/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex(p => p.id === item.id && p.groupTag === item.groupTag);
      if (idx >= 0) { 
        const copy = [...prev]; 
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + item.qty }; 
        return copy; 
      }
      return [...prev, item];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter(p => p.id !== id));
  }, []);

  const clear = () => setItems([]);
  const total = items.reduce((s, it) => s + it.qty * it.price, 0);

  return { items, add, setQty, removeItem, clear, total };
}