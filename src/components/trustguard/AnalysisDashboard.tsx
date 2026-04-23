import { ArrowLeft, Trophy, TrendingUp, AlertTriangle } from "lucide-react";
import { MatchResult, UserProfile, ResumeAnalysis } from "@/lib/demoData";
import { PlatformScoreCard } from "./PlatformScoreCard";
import { SkillGapModule } from "./SkillGapModule";
import { RecommendationCard } from "./RecommendationCard";

interface AnalysisDashboardProps {
  results: MatchResult[];
  profile: UserProfile;
  resumeAnalysis: ResumeAnalysis | null;
  onBack: () => void;
}

export function AnalysisDashboard({ results, profile, resumeAnalysis, onBack }: AnalysisDashboardProps) {
  const topResult = results[0];

  return (
    <div className="container mx-auto px-6 py-10 max-w-5xl space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analysis Results</h1>
          <p className="text-sm text-muted-foreground">Your freelancing success prediction dashboard</p>
        </div>
      </div>

      {/* Resume Summary */}
      {resumeAnalysis && (
        <div className="bg-gradient-card rounded-xl border border-border p-6 animate-slide-up">
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Resume Analysis Summary
          </h2>
          <p className="text-sm text-muted-foreground mb-4">{resumeAnalysis.summary}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gradient-primary">{resumeAnalysis.strengthScore}%</p>
              <p className="text-xs text-muted-foreground mt-1">Resume Strength</p>
            </div>
            <div className="glass rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{resumeAnalysis.extractedSkills.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Skills Found</p>
            </div>
            <div className="glass rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-foreground">{resumeAnalysis.experienceYears}yr</p>
              <p className="text-xs text-muted-foreground mt-1">Experience</p>
            </div>
            <div className="glass rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gradient-accent">{resumeAnalysis.domain.split(" ")[0]}</p>
              <p className="text-xs text-muted-foreground mt-1">Domain</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Recommendation */}
      {topResult && (
        <RecommendationCard result={topResult} />
      )}

      {/* All Platform Scores */}
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-accent" />
          Platform Match Scores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((result, index) => (
            <PlatformScoreCard key={result.platform.id} result={result} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Skill Gap */}
      {topResult && (
        <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Skill Improvement Suggestions
          </h2>
          <SkillGapModule results={results.slice(0, 4)} />
        </div>
      )}
    </div>
  );
}
