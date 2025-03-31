import Header from '@/components/layout/Header';
import CtaSection from '@/components/main/CtaSection';
import FaqSection from '@/components/main/FaqSection';
import FeatureSection from '@/components/main/FeatureSection';
import FooterSection from '@/components/main/FooterSection';
import GuideSection from '@/components/main/GuideSection';
import HeroSection from '@/components/main/HeroSection';
import UserReviewSection from '@/components/main/UserReviewSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-col justify-center">
        <HeroSection />
        <FeatureSection />
        <GuideSection />
        <UserReviewSection />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </main>
    </div>
  );
}
