import { useEffect, useState } from "react";
import { Shield, Sparkles } from "lucide-react";
import { UserInputModule } from "@/components/trustguard/UserInputModule";
import { ResumeUploadModule } from "@/components/trustguard/ResumeUploadModule";
import { AnalysisDashboard } from "@/components/trustguard/AnalysisDashboard";
import { HeroSection } from "@/components/trustguard/HeroSection";
import { StepIndicator } from "@/components/trustguard/StepIndicator";
import { LiveThinkingLog } from "@/components/trustguard/LiveThinkingLog";
import {
  UserProfile,
  ResumeAnalysis,
  MatchResult,
  calculateMatchScores,
} from "@/lib/demoData";
import { toast } from "sonner";

const Index = () => {
  const [step, setStep] = useState<"hero" | "input" | "results">("hero");
  const [profile, setProfile] = useState<UserProfile>({
    skills: [],
    experienceLevel: "",
    interests: [],
  });
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showThinkingLog, setShowThinkingLog] = useState(false);

  useEffect(() => {
    // Fetch existing profile on mount
    fetch("http://localhost:5000/api/user-profile")
      .then(res => res.json())
      .then(data => {
        if (data.analysis) {
          setResumeAnalysis(data.analysis);
          setProfile({
            skills: data.skills || [],
            experienceLevel: data.experienceLevel || "",
            interests: data.interests || [],
            resumeAnalysis: data.analysis
          });
        }
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  const handleResumeUpload = (fileName: string, analysis: ResumeAnalysis) => {
    setResumeAnalysis(analysis);
    setProfile(prev => ({ ...prev, resumeAnalysis: analysis }));
    toast.success(`Resume "${fileName}" analyzed successfully!`);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setShowThinkingLog(true);

    try {
      // Save current profile state to backend
      await fetch("http://localhost:5000/api/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      // The analysis happens during the thinking log simulation
      // When the log completes, it calls onComplete which sets the step to results
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save profile. Please try again.");
      setIsAnalyzing(false);
      setShowThinkingLog(false);
    }
  };

  const handleAnalysisComplete = () => {
    const matchResults = calculateMatchScores(profile);
    setResults(matchResults);
    setIsAnalyzing(false);
    setTimeout(() => {
      setStep("results");
      setShowThinkingLog(false);
    }, 1000);
  };

  const handleReset = () => {
    setStep("hero");
    setProfile({ skills: [], experienceLevel: "", interests: [] });
    setResumeAnalysis(null);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              Trust<span className="text-gradient-primary">Guard</span>
            </span>
          </div>
          {step !== "hero" && (
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      <main className="pt-20">
        {step === "hero" && <HeroSection onGetStarted={() => setStep("input")} />}

        {step === "input" && (
          <div className="container mx-auto px-6 py-10 max-w-4xl">
            <StepIndicator currentStep={resumeAnalysis ? 2 : 1} />
            <div className="space-y-8 mt-8">
              {!showThinkingLog ? (
                <>
                  <ResumeUploadModule
                    onUpload={handleResumeUpload}
                    analysis={resumeAnalysis}
                  />
                  <UserInputModule
                    profile={profile}
                    onChange={setProfile}
                  />
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || (profile.skills.length === 0 && !resumeAnalysis)}
                      className="group relative px-10 py-4 rounded-lg font-semibold text-primary-foreground bg-gradient-primary shadow-glow hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        {isAnalyzing ? "Analyzing..." : "Analyze & Match Platforms"}
                      </span>
                      {isAnalyzing && (
                        <span className="absolute inset-0 rounded-lg border-2 border-primary animate-pulse-glow" />
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <LiveThinkingLog 
                  isAnalyzing={showThinkingLog} 
                  onComplete={handleAnalysisComplete}
                />
              )}
            </div>
          </div>
        )}

        {step === "results" && (
          <AnalysisDashboard
            results={results}
            profile={profile}
            resumeAnalysis={resumeAnalysis}
            onBack={() => setStep("input")}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
