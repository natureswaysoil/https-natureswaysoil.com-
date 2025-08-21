import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from '@/components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
