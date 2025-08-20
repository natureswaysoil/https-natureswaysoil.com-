import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { getProduct, Product } from '@/lib/cart';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || '';
    const qty = params.get('qty') || '1';
    const prod = getProduct(slug);
    setProduct(prod || null);
    if (slug) {
      fetch(`/api/stripe/create-intent?slug=${slug}&qty=${qty}`)
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, []);

  if (!product) {
    return <p className="p-4">Product not found.</p>;
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Checkout — {product.title}</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
