import type { Metadata } from 'next';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <Loader />
      <Header />
      <main id="main-content">
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
