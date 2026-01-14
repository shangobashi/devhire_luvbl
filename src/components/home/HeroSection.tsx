import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Sparkles, ArrowRight, Users, Building2, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { icon: Briefcase, value: "5,000+", label: "Active Jobs" },
  { icon: Building2, value: "1,200+", label: "Companies" },
  { icon: Users, value: "50,000+", label: "Developers" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-hero-pattern">
      {/* Gradient Background */}
      <div className="absolute inset-0 hero-gradient opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-accent/10 via-transparent to-transparent" />
      
      <div className="page-container relative">
        <div className="py-20 md:py-32 lg:py-40">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>The #1 Job Board for Web Developers</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Find Your Dream{" "}
              <span className="text-gradient">Developer Job</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Connect with top tech companies hiring React, Node.js, Python, and more. 
              Your next opportunity is just a click away.
            </motion.p>

            {/* Search Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Job title, skills, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-background border-2 border-border hover:border-primary/30 focus:border-primary input-focus"
                />
              </div>
              <div className="relative flex-1 sm:flex-none sm:w-48">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Location"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-background border-2 border-border hover:border-primary/30 focus:border-primary input-focus"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 hero-gradient btn-shine text-base font-semibold"
              >
                Search Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.form>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm"
            >
              <span className="text-muted-foreground">Popular:</span>
              {["React", "Node.js", "Python", "Remote", "Senior"].map((tag) => (
                <Button
                  key={tag}
                  variant="ghost"
                  size="sm"
                  className="h-8 text-primary hover:bg-primary/10"
                  onClick={() => navigate(`/jobs?q=${tag}`)}
                >
                  {tag}
                </Button>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
