import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobCard } from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function FeaturedJobs() {
  const navigate = useNavigate();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["featured-jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select(`
          id,
          slug,
          title,
          location,
          is_remote,
          job_type,
          experience_level,
          salary_min,
          salary_max,
          salary_currency,
          skills_required,
          published_at,
          created_at,
          company_profiles (
            company_name,
            company_logo,
            industry
          )
        `)
        .eq("status", "published")
        .eq("payment_status", "paid")
        .order("published_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-spacing bg-muted/30">
      <div className="page-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Featured <span className="text-gradient">Jobs</span>
            </h2>
            <p className="text-muted-foreground">
              Hand-picked opportunities from top companies
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/jobs")}
            className="self-start md:self-auto"
          >
            View All Jobs
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : jobs && jobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 stagger-children">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <JobCard job={job as any} featured={index < 2} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No jobs available yet.</p>
            <Button onClick={() => navigate("/employer/post-job")} className="hero-gradient">
              Post the First Job
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
