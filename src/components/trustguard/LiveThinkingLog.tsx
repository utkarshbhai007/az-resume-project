import { useEffect, useState, useRef } from "react";
import { Terminal, Brain, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface LogEntry {
  id: string;
  message: string;
  type: "info" | "success" | "loading" | "ai";
}

interface LiveThinkingLogProps {
  isAnalyzing: boolean;
  onComplete?: () => void;
}

export function LiveThinkingLog({ isAnalyzing, onComplete }: LiveThinkingLogProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    { message: "Initializing secure connection to Groq AI...", duration: 1500, type: "info" },
    { message: "Analyzing professional professional experience depth...", duration: 2000, type: "ai" },
    { message: "Matching skill clusters with freelance market trends...", duration: 2500, type: "ai" },
    { message: "Calculating platform compatibility scores...", duration: 2000, type: "info" },
    { message: "Finalizing recommendation engine...", duration: 1500, type: "success" },
  ];

  useEffect(() => {
    if (isAnalyzing) {
      setLogs([{ id: "0", message: "Receiving resume data...", type: "loading" }]);
      
      let currentStep = 0;
      const executeNextStep = () => {
        if (currentStep < steps.length) {
          const step = steps[currentStep];
          setLogs(prev => {
            const updated = [...prev];
            // Mark previous as complete
            if (updated.length > 0) {
              updated[updated.length - 1].type = "success";
            }
            return [...updated, { id: String(currentStep + 1), message: step.message, type: step.type as any }];
          });

          setTimeout(() => {
            currentStep++;
            executeNextStep();
          }, step.duration);
        } else {
          setLogs(prev => {
            const updated = [...prev];
            if (updated.length > 0) updated[updated.length - 1].type = "success";
            return [...updated, { id: "final", message: "Analysis complete! Preparing dashboard...", type: "success" }];
          });
          onComplete?.();
        }
      };

      const initialTimeout = setTimeout(executeNextStep, 1000);
      return () => clearTimeout(initialTimeout);
    } else {
      setLogs([]);
    }
  }, [isAnalyzing]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isAnalyzing && logs.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-black/80 backdrop-blur-md rounded-xl border border-primary/20 shadow-2xl overflow-hidden font-mono text-sm">
        <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-primary/70 uppercase tracking-widest text-[10px] font-bold">AI Thinking Log</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="p-4 h-64 overflow-y-auto space-y-3 custom-scrollbar"
        >
          {logs.map((log) => (
            <div key={log.id} className="flex gap-3 item-start">
              {log.type === "loading" && <Loader2 className="h-4 w-4 text-blue-400 animate-spin mt-1 shrink-0" />}
              {log.type === "info" && <Brain className="h-4 w-4 text-purple-400 mt-1 shrink-0" />}
              {log.type === "ai" && <Sparkles className="h-4 w-4 text-yellow-400 mt-1 shrink-0" />}
              {log.type === "success" && <CheckCircle2 className="h-4 w-4 text-green-400 mt-1 shrink-0" />}
              
              <div className="flex flex-col">
                <p className={`${
                  log.type === "success" ? "text-green-400/90" : 
                  log.type === "ai" ? "text-yellow-400/90" : "text-white/80"
                }`}>
                  <span className="text-white/20 mr-2">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  {log.message}
                </p>
                {log.type === "loading" && (
                  <div className="w-full h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-progress" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isAnalyzing && (
            <div className="flex gap-2 items-center text-primary animate-pulse">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>AI is processing...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
