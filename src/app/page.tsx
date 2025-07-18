import LatestInsightsWithCalendar from "@/components/Calender";
import CallToAction from "@/components/CallToAction";
import FeaturesSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import { AnimatedTooltipPreview } from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import  Footer  from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white antialiased bg-grid-white/[0.02]">
      <HeroSection/>
      <FeaturesSection/>
      <WhyChooseUs/>
      <AnimatedTooltipPreview/>
      <LatestInsightsWithCalendar/>
      <CallToAction/>
      <Footer/>
    </main>
  );
}
