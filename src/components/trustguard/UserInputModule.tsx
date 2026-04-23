import { useState } from "react";
import { Code, Briefcase, Heart, X, Search } from "lucide-react";
import {
  UserProfile,
  SKILL_OPTIONS,
  EXPERIENCE_LEVELS,
  INTEREST_OPTIONS,
} from "@/lib/demoData";

interface UserInputModuleProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
}

export function UserInputModule({ profile, onChange }: UserInputModuleProps) {
  const [skillSearch, setSkillSearch] = useState("");

  const filteredSkills = SKILL_OPTIONS.filter(
    s => s.toLowerCase().includes(skillSearch.toLowerCase()) && !profile.skills.includes(s)
  );

  const toggleSkill = (skill: string) => {
    const skills = profile.skills.includes(skill)
      ? profile.skills.filter(s => s !== skill)
      : [...profile.skills, skill];
    onChange({ ...profile, skills });
  };

  const toggleInterest = (interest: string) => {
    const interests = profile.interests.includes(interest)
      ? profile.interests.filter(i => i !== interest)
      : [...profile.interests, interest];
    onChange({ ...profile, interests });
  };

  return (
    <div className="space-y-6">
      {/* Skills */}
      <div className="bg-gradient-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Code className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Your Skills</h2>
        </div>

        {profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {profile.skills.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="group inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-md bg-primary/15 text-primary border border-primary/25 hover:bg-destructive/15 hover:text-destructive hover:border-destructive/25 transition-colors"
              >
                {skill}
                <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        )}

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skills..."
            value={skillSearch}
            onChange={e => setSkillSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
          {filteredSkills.slice(0, 30).map(skill => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground border border-border hover:border-primary/40 hover:text-primary transition-colors"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bg-gradient-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Experience Level</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {EXPERIENCE_LEVELS.map(level => (
            <button
              key={level.value}
              onClick={() => onChange({ ...profile, experienceLevel: level.value })}
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                profile.experienceLevel === level.value
                  ? "glow-border text-primary bg-primary/10"
                  : "border-border text-muted-foreground bg-secondary hover:border-primary/30"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="bg-gradient-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Freelancing Interests</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                profile.interests.includes(interest)
                  ? "glow-border text-primary bg-primary/10"
                  : "border-border text-muted-foreground bg-secondary hover:border-primary/30"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
