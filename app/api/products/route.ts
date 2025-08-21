import { NextResponse } from 'next/server';
import type { Product } from '@/lib/cart';
import productsData from '@/data/products.json';

const products = productsData as Product[];

export async function GET() {
  // Normalize pricing values to plain numbers for JSON serialization
  const normalized: Product[] = products.map((product: Product) => ({
    ...product,
    price: Number(product.price ?? 0),
  }));

  return NextResponse.json(normalized);
}
