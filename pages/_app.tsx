import type { AppProps } from 'next/app';
import '../styles/globals.css';
import TopBanner from '@/components/TopBanner';
import Navigation from '@/components/Navigation';
import EducationalChatWidget from '@/components/EducationalChatWidget';
import ExitIntentPopup from '@/components/ExitIntentPopup';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopBanner />
      <Navigation />
      <Component {...pageProps} />
      <EducationalChatWidget />
      <ExitIntentPopup />
    </>
  );
}
