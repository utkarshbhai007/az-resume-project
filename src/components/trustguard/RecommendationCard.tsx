import { Award, CheckCircle, MessageSquare } from "lucide-react";
import { MatchResult } from "@/lib/demoData";

interface RecommendationCardProps {
  result: MatchResult;
}

export function RecommendationCard({ result }: RecommendationCardProps) {
  const { platform, overallScore, confidenceLevel, reasons } = result;

  return (
    <div className="relative rounded-xl border glow-border p-6 bg-gradient-card overflow-hidden animate-slide-up" style={{ animationDelay: "0.1s" }}>
      {/* Subtle glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-6 w-6 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Top Recommended Platform</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{platform.logo}</span>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{platform.name}</h3>
              <p className="text-sm text-muted-foreground">{platform.description}</p>
            </div>
          </div>

          <div className="md:ml-auto flex items-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-black font-mono text-gradient-primary">{overallScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">Match Score</p>
            </div>
            <div className="text-center">
              <div className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold ${
                confidenceLevel === "High"
                  ? "bg-success/15 text-success"
                  : confidenceLevel === "Medium"
                  ? "bg-warning/15 text-warning"
                  : "bg-destructive/15 text-destructive"
              }`}>
                {confidenceLevel}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Confidence</p>
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="mt-6 pt-5 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium text-foreground">Why this platform?</p>
          </div>
          <div className="space-y-2">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
