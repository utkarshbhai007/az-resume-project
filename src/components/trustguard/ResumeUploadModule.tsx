import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { ResumeAnalysis } from "@/lib/demoData";

interface ResumeUploadModuleProps {
  onUpload: (fileName: string) => void;
  analysis: ResumeAnalysis | null;
}

export function ResumeUploadModule({ onUpload, analysis }: ResumeUploadModuleProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const analysis = await response.json();
      onUpload(file.name, analysis);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("resume-input")?.click();
  };

  return (
    <div className="bg-gradient-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Resume Upload</h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">Optional</span>
      </div>

      {!analysis ? (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <input
            type="file"
            id="resume-input"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Reading file...</p>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-foreground font-medium">Click to upload your resume</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or TXT — AI will analyze in real-time</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{fileName} — Analyzed Successfully</span>
          </div>

          <div className="glass rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Domain</span>
              <span className="text-sm font-medium text-foreground">{analysis.domain}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Experience</span>
              <span className="text-sm font-medium text-foreground">{analysis.experienceYears} years</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Resume Strength</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary rounded-full"
                    style={{ width: `${analysis.strengthScore}%` }}
                  />
                </div>
                <span className="text-sm font-mono text-primary">{analysis.strengthScore}%</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block mb-2">Extracted Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.extractedSkills.map(skill => (
                  <span key={skill} className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
