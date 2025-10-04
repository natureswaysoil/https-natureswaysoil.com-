import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Navigation from '@/components/Navigation';
import ChatWidget from '@/components/ChatWidget';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}
