import { useState, useCallback, useEffect, useMemo } from "react";
import type { CartItem } from "@/lib/types";

const CART_KEY = "modulo_cart_v1";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { 
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); 
    } catch { 
      return []; 
    }
  });

  useEffect(() => { 
    localStorage.setItem(CART_KEY, JSON.stringify(items)); 
  }, [items]);

  const add = useCallback((item: CartItem) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === item.id && p.groupTag === item.groupTag);
      if (idx >= 0) { 
        const copy = [...prev]; 
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + item.qty }; 
        return copy; 
      }
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));
  }, []);

  const clear = () => setItems([]);
  
  const total = useMemo(() => 
    items.reduce((s, it) => s + it.qty * it.price, 0), 
    [items]
  );

  return { items, add, remove, setQty, clear, total };
}