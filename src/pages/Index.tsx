import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { PricingSection } from "@/components/home/PricingSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedJobs />
      <PricingSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
