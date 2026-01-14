import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, DollarSign, Briefcase, Building2 } from "lucide-react";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: {
    id: string;
    slug: string;
    title: string;
    location: string;
    is_remote: boolean;
    job_type: keyof typeof JOB_TYPES;
    experience_level: keyof typeof EXPERIENCE_LEVELS;
    salary_min: number | null;
    salary_max: number | null;
    salary_currency: string;
    skills_required: string[];
    published_at: string | null;
    created_at: string;
    company_profiles?: {
      company_name: string;
      company_logo: string | null;
      industry: string | null;
    } | null;
  };
  featured?: boolean;
}

export function JobCard({ job, featured = false }: JobCardProps) {
  const formatSalary = (min: number | null, max: number | null, currency: string) => {
    if (!min && !max) return null;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    });
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    }
    if (min) return `From ${formatter.format(min)}`;
    if (max) return `Up to ${formatter.format(max)}`;
    return null;
  };

  const salary = formatSalary(job.salary_min, job.salary_max, job.salary_currency);
  const timeAgo = job.published_at
    ? formatDistanceToNow(new Date(job.published_at), { addSuffix: true })
    : formatDistanceToNow(new Date(job.created_at), { addSuffix: true });

  const companyName = job.company_profiles?.company_name || "Company";
  const companyLogo = job.company_profiles?.company_logo;
  const industry = job.company_profiles?.industry;

  return (
    <Link to={`/jobs/${job.slug}`}>
      <Card className={`job-card p-6 hover:border-primary/30 transition-all ${featured ? "border-primary/50 glow-primary" : ""}`}>
        <div className="flex gap-4">
          {/* Company Logo */}
          <Avatar className="h-14 w-14 rounded-xl flex-shrink-0">
            <AvatarImage src={companyLogo || undefined} className="object-cover" />
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary text-lg font-semibold">
              {companyName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground truncate hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  <span className="text-sm">{companyName}</span>
                  {industry && (
                    <>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="text-sm">{industry}</span>
                    </>
                  )}
                </div>
              </div>
              {featured && (
                <Badge className="hero-gradient text-white flex-shrink-0">Featured</Badge>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{job.is_remote ? "Remote" : job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{JOB_TYPES[job.job_type]}</span>
              </div>
              {salary && (
                <div className="flex items-center gap-1 text-success font-medium">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>{salary}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{timeAgo}</span>
              </div>
            </div>

            {/* Skills */}
            {job.skills_required && job.skills_required.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {job.skills_required.slice(0, 4).map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
                {job.skills_required.length > 4 && (
                  <span className="text-xs text-muted-foreground self-center">
                    +{job.skills_required.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
