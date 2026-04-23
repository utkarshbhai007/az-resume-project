import { Check } from "lucide-react";

const steps = ["Upload Resume", "Enter Skills & Interests", "View Results"];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;
        return (
          <div key={label} className="flex items-center gap-2 md:gap-4">
            {i > 0 && (
              <div className={`hidden md:block w-12 h-px ${isDone ? "bg-primary" : "bg-border"}`} />
            )}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  isDone
                    ? "bg-gradient-primary text-primary-foreground"
                    : isActive
                    ? "glow-border text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : stepNum}
              </div>
              <span className={`hidden md:inline text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
