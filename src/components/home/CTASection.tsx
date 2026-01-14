import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="section-spacing">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 bg-hero-pattern opacity-10" />
          
          {/* Content */}
          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Hire Top Developers?
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Post your job in minutes and start receiving applications from talented developers today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/employer/post-job")}
                className="h-14 px-8 bg-white text-primary hover:bg-white/90 font-semibold text-base"
              >
                Post a Job Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/jobs")}
                className="h-14 px-8 border-white/40 text-white bg-white/10 hover:bg-white/20 font-semibold text-base"
              >
                Browse Jobs
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
