import { useState } from "react";
import { Lightbulb, ArrowUpRight, Sparkles } from "lucide-react";
import { MatchResult } from "@/lib/demoData";
import { RoadmapModal } from "./RoadmapModal";

interface SkillGapModuleProps {
  results: MatchResult[];
}

export function SkillGapModule({ results }: SkillGapModuleProps) {
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);

  // Aggregate missing skills across top platforms
  const skillFrequency: Record<string, string[]> = {};
  results.forEach(r => {
    r.missingSkills.forEach(skill => {
      if (!skillFrequency[skill]) skillFrequency[skill] = [];
      if (!skillFrequency[skill].includes(r.platform.name)) {
        skillFrequency[skill].push(r.platform.name);
      }
    });
  });

  const sortedGaps = Object.entries(skillFrequency)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 8);

  const missingSkillsList = sortedGaps.map(([skill]) => skill);

  if (sortedGaps.length === 0) {
    return (
      <div className="bg-gradient-card rounded-xl border border-border p-6 text-center">
        <p className="text-sm text-success">Great job! You have strong skill coverage across top platforms.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-xl border border-border p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-warning" />
          <p className="text-sm text-muted-foreground">
            Learning these skills could increase your match scores across multiple platforms.
          </p>
        </div>
        <button
          onClick={() => setIsRoadmapOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all text-sm font-semibold whitespace-nowrap"
        >
          <Sparkles className="h-4 w-4" />
          Generate Learning Roadmap
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {sortedGaps.map(([skill, platforms]) => (
          <div key={skill} className="flex items-center justify-between glass rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm font-medium text-foreground">{skill}</p>
                <p className="text-xs text-muted-foreground">
                  Needed by: {platforms.join(", ")}
                </p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs rounded-full bg-warning/10 text-warning font-medium">
              +{platforms.length} platform{platforms.length > 1 ? "s" : ""}
            </span>
          </div>
        ))}
      </div>

      <RoadmapModal 
        isOpen={isRoadmapOpen} 
        onClose={() => setIsRoadmapOpen(false)} 
        missingSkills={missingSkillsList}
      />
    </div>
  );
}
