import { useState } from "react";
import { X, BookOpen, Clock, ExternalLink, Sparkles, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface RoadmapStep {
  id: number;
  title: string;
  content: string;
  estimatedTime: string;
  resources: string[];
}

interface RoadmapData {
  title: string;
  description: string;
  steps: RoadmapStep[];
}

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingSkills: string[];
}

export function RoadmapModal({ isOpen, onClose, missingSkills }: RoadmapModalProps) {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  const generateRoadmap = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missingSkills }),
      });
      const data = await response.json();
      setRoadmap(data);
    } catch (error) {
      console.error("Roadmap generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate if open and no roadmap
  if (isOpen && !roadmap && !loading) {
    generateRoadmap();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20 custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="h-6 w-6 text-primary" />
            Skill Roadmap
          </DialogTitle>
          <DialogDescription>
            AI-powered learning path for: {missingSkills.join(", ")}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-muted-foreground animate-pulse">Llama AI is mapping your learning journey...</p>
          </div>
        ) : roadmap ? (
          <div className="mt-6 space-y-8 relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent ml-[-1px]" />

            {roadmap.steps.map((step, index) => (
              <div key={step.id} className="relative pl-10 group">
                {/* Step Node */}
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-glow transition-transform group-hover:scale-110">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>

                <div className="bg-gradient-card rounded-xl border border-border p-5 hover:border-primary/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <h3 className="font-bold text-lg text-foreground">{step.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full w-fit">
                      <Clock className="h-3 w-3" />
                      {step.estimatedTime}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.content}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-primary/70 uppercase tracking-wider">
                      <BookOpen className="h-3 w-3" />
                      Recommended Resources
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.resources.map((resource) => (
                        <div
                          key={resource}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-xs text-secondary-foreground border border-border hover:border-primary/20 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3 opacity-50" />
                          {resource}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center mt-8">
              <p className="text-sm font-medium text-primary">
                "Small steps every day lead to big results. You've got this!"
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Failed to generate roadmap. Please try again.</p>
            <button 
              onClick={generateRoadmap}
              className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
            >
              Retry Generation
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
