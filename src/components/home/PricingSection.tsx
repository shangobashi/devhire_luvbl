import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { JOB_POSTING_PRICE_DISPLAY, JOB_DURATION_DAYS } from "@/lib/constants";

const features = [
  "30-day job listing",
  "Featured on homepage for 7 days",
  "Highlighted in search results",
  "Company profile page",
  "Direct applications inbox",
  "Email notifications",
  "Analytics dashboard",
  "Edit anytime",
];

export function PricingSection() {
  const navigate = useNavigate();

  return (
    <section className="section-spacing">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One flat rate to reach thousands of qualified developers. No hidden fees, no subscriptions.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto"
        >
          <Card className="relative overflow-hidden border-2 border-primary shadow-card">
            {/* Popular badge */}
            <div className="absolute top-0 right-0">
              <div className="hero-gradient text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Job Posting</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gradient">{JOB_POSTING_PRICE_DISPLAY}</span>
                  <span className="text-muted-foreground">/ job</span>
                </div>
                <p className="text-muted-foreground mt-2">
                  {JOB_DURATION_DAYS} days of visibility
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="h-3 w-3 text-success" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/auth?mode=signup&role=employer")}
                className="w-full h-12 hero-gradient btn-shine text-lg font-semibold"
              >
                Post Your Job Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Secure payment via Stripe
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
