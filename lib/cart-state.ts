import { useState, useEffect } from 'react';

export type CartItem = { slug: string; qty: number };

const STORAGE_KEY = 'cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setItems(JSON.parse(raw));
  }, []);

  const save = (next: CartItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const add = (slug: string) => {
    const existing = items.find((i) => i.slug === slug);
    if (existing) {
      save(items.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      save([...items, { slug, qty: 1 }]);
    }
  };

  const clear = () => save([]);

  return { items, add, clear };
}
