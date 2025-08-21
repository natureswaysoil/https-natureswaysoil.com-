import { NextResponse } from 'next/server';
import type { Product } from '@/lib/cart';
import productsData from '@/data/products.json';

const products = productsData as Product[];

export async function GET() {
  const normalized: Product[] = products.map((product: Product) => ({
    ...product,
    price: Number(product.price),
  }));

  return NextResponse.json(normalized);
}
