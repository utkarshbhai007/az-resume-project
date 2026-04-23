import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { MatchResult } from "@/lib/demoData";

interface PlatformScoreCardProps {
  result: MatchResult;
  rank: number;
}

export function PlatformScoreCard({ result, rank }: PlatformScoreCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { platform, overallScore, skillMatchScore, experienceMatchScore, interestAlignmentScore } = result;

  const scoreColor = overallScore >= 70 ? "text-success" : overallScore >= 45 ? "text-warning" : "text-destructive";
  const barColor = overallScore >= 70 ? "bg-success" : overallScore >= 45 ? "bg-warning" : "bg-destructive";

  return (
    <div className="bg-gradient-card rounded-xl border border-border p-5 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{platform.logo}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{platform.name}</h3>
              {rank <= 3 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-accent/15 text-accent">
                  #{rank}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{platform.category} • {platform.avgHourlyRate}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold font-mono ${scoreColor}`}>{overallScore}%</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{result.confidenceLevel} confidence</p>
        </div>
      </div>

      {/* Overall bar */}
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-3">
        <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${overallScore}%` }} />
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
      >
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        {expanded ? "Less details" : "Score breakdown"}
      </button>

      {expanded && (
        <div className="mt-4 space-y-3 animate-fade-in">
          {[
            { label: "Skill Match", score: skillMatchScore, weight: "50%" },
            { label: "Experience Fit", score: experienceMatchScore, weight: "25%" },
            { label: "Interest Alignment", score: interestAlignmentScore, weight: "25%" },
          ].map(({ label, score, weight }) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{label} <span className="text-muted-foreground/50">({weight})</span></span>
                <span className="font-mono text-foreground">{score}%</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary/70 rounded-full" style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}

          {result.matchedSkills.length > 0 && (
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-1.5">Matched Skills</p>
              <div className="flex flex-wrap gap-1">
                {result.matchedSkills.map(s => (
                  <span key={s} className="px-2 py-0.5 text-[10px] rounded bg-success/10 text-success border border-success/20">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-1">
            <p className="text-xs text-muted-foreground">Competition: <span className="text-foreground">{platform.competitionLevel}</span></p>
            <p className="text-xs text-muted-foreground">Beginner Friendly: <span className="text-foreground">{platform.beginnerFriendliness}/10</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
