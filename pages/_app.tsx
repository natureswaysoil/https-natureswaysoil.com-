import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '@/components/Header';
import { CartProvider } from '@/lib/cart-context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <footer className="text-center p-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Nature's Way Soil®
        </footer>
      </div>
    </CartProvider>
  );
}
