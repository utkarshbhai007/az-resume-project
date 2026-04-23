import { Shield, ArrowRight, Zap, Target, BarChart3 } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />

      <div className="relative z-10 text-center max-w-3xl animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 mb-8">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Freelance Success Prediction</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
          Find Your
          <br />
          <span className="text-gradient-primary">Perfect Platform</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Upload your resume, input your skills, and let our AI match you with the
          freelancing platform where you're most likely to succeed.
        </p>

        <button
          onClick={onGetStarted}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-primary-foreground bg-gradient-primary shadow-glow hover:shadow-elevated transition-all duration-300"
        >
          Get Started
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Feature pills */}
      <div className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
        {[
          { icon: Shield, label: "Resume Analysis", desc: "AI-powered skill extraction" },
          { icon: Target, label: "Smart Matching", desc: "Weighted scoring algorithm" },
          { icon: BarChart3, label: "Gap Analysis", desc: "Skill improvement roadmap" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="glass rounded-lg p-5 text-center">
            <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="font-semibold text-sm text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
