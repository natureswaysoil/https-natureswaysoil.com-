import { FormEvent, useState } from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const result: any = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/checkout?status=success',
      },
    });
    if (result.error) {
      setMessage(result.error.message || 'An unexpected error occurred.');
    } else if (result.paymentIntent) {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: result.paymentIntent.id, name, email }),
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        required
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Processing…' : 'Pay now'}
      </button>
      {message && <div className="text-red-500">{message}</div>}
    </form>
  );
}
