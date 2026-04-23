export interface Platform {
  id: string;
  name: string;
  logo: string;
  skillFocus: string[];
  competitionLevel: "Low" | "Medium" | "High" | "Very High";
  beginnerFriendliness: number; // 1-10
  avgHourlyRate: string;
  description: string;
  category: string;
}

export interface MatchResult {
  platform: Platform;
  overallScore: number;
  skillMatchScore: number;
  experienceMatchScore: number;
  interestAlignmentScore: number;
  confidenceLevel: "High" | "Medium" | "Low";
  matchedSkills: string[];
  missingSkills: string[];
  reasons: string[];
}

export interface ResumeAnalysis {
  extractedSkills: string[];
  domain: string;
  experienceYears: number;
  strengthScore: number;
  summary: string;
  highlights: string[];
}

export interface UserProfile {
  skills: string[];
  experienceLevel: string;
  interests: string[];
  resumeAnalysis?: ResumeAnalysis;
}

export const SKILL_OPTIONS = [
  "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js",
  "Python", "Django", "Flask", "Java", "Spring Boot", "C#", ".NET",
  "PHP", "Laravel", "Ruby", "Rails", "Go", "Rust", "Swift", "Kotlin",
  "HTML/CSS", "Tailwind CSS", "SASS", "Bootstrap",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes",
  "GraphQL", "REST API", "Microservices",
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
  "Data Science", "Data Analysis", "Pandas", "TensorFlow", "PyTorch",
  "UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator",
  "SEO", "Content Writing", "Copywriting", "Digital Marketing",
  "Video Editing", "Motion Graphics", "3D Modeling", "Blender",
  "Mobile Development", "React Native", "Flutter",
  "Blockchain", "Solidity", "Web3",
  "DevOps", "CI/CD", "Linux", "Networking",
  "Project Management", "Agile", "Scrum",
];

export const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner (0-1 years)", years: 0.5 },
  { value: "junior", label: "Junior (1-2 years)", years: 1.5 },
  { value: "intermediate", label: "Intermediate (2-4 years)", years: 3 },
  { value: "senior", label: "Senior (4-7 years)", years: 5.5 },
  { value: "expert", label: "Expert (7+ years)", years: 8 },
];

export const INTEREST_OPTIONS = [
  "Web Development", "Mobile App Development", "Data Science & AI",
  "Graphic Design", "Content Writing", "Video Production",
  "Digital Marketing", "DevOps & Cloud", "Game Development",
  "Blockchain & Crypto", "Cybersecurity", "E-commerce",
  "Virtual Assistant", "Translation", "Voice Over",
  "SEO Optimization", "Social Media Management", "UI/UX Design",
];

export const PLATFORMS: Platform[] = [
  {
    id: "upwork",
    name: "Upwork",
    logo: "🟢",
    skillFocus: ["JavaScript", "React", "Node.js", "Python", "UI/UX Design", "Content Writing", "Data Science", "Mobile Development", "AWS", "TypeScript", "Angular", "Vue.js", "PHP", "Laravel", "GraphQL", "REST API", "Machine Learning", "Digital Marketing", "SEO", "Project Management"],
    competitionLevel: "High",
    beginnerFriendliness: 5,
    avgHourlyRate: "$15-$80+",
    description: "The world's largest freelancing marketplace with diverse project categories",
    category: "General",
  },
  {
    id: "fiverr",
    name: "Fiverr",
    logo: "🟩",
    skillFocus: ["Graphic Design", "Video Editing", "Content Writing", "SEO", "Digital Marketing", "Voice Over", "Motion Graphics", "Copywriting", "Social Media Management", "UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "3D Modeling", "Blender", "Translation"],
    competitionLevel: "Very High",
    beginnerFriendliness: 7,
    avgHourlyRate: "$5-$50+",
    description: "Gig-based marketplace ideal for creative and digital services",
    category: "Creative & Digital",
  },
  {
    id: "toptal",
    name: "Toptal",
    logo: "🔵",
    skillFocus: ["JavaScript", "React", "TypeScript", "Python", "Java", "C#", ".NET", "Ruby", "Rails", "Go", "Rust", "Node.js", "Angular", "Vue.js", "PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes", "Microservices", "Machine Learning", "Deep Learning", "DevOps", "Spring Boot"],
    competitionLevel: "Very High",
    beginnerFriendliness: 2,
    avgHourlyRate: "$60-$200+",
    description: "Elite network of top 3% freelance talent for enterprise clients",
    category: "Premium Tech",
  },
  {
    id: "freelancer",
    name: "Freelancer.com",
    logo: "🔷",
    skillFocus: ["PHP", "WordPress", "JavaScript", "Python", "Java", "HTML/CSS", "MySQL", "React", "Angular", "Mobile Development", "Data Entry", "Content Writing", "SEO", "Photoshop", "Digital Marketing", "Laravel"],
    competitionLevel: "High",
    beginnerFriendliness: 6,
    avgHourlyRate: "$10-$50+",
    description: "Global marketplace with contest-based and project-based work",
    category: "General",
  },
  {
    id: "guru",
    name: "Guru",
    logo: "🟠",
    skillFocus: ["Web Development", "JavaScript", "PHP", "Python", "Java", "Content Writing", "SEO", "Digital Marketing", "Graphic Design", "Project Management", "Agile", "HTML/CSS", "MySQL", "PostgreSQL"],
    competitionLevel: "Medium",
    beginnerFriendliness: 7,
    avgHourlyRate: "$10-$60+",
    description: "Professional marketplace with safe payment and workroom features",
    category: "General",
  },
  {
    id: "99designs",
    name: "99designs",
    logo: "🎨",
    skillFocus: ["Graphic Design", "UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "3D Modeling", "Motion Graphics", "Blender"],
    competitionLevel: "High",
    beginnerFriendliness: 5,
    avgHourlyRate: "$30-$100+",
    description: "Design-focused platform with contest and 1-on-1 project options",
    category: "Design",
  },
  {
    id: "peopleperhour",
    name: "PeoplePerHour",
    logo: "⏰",
    skillFocus: ["JavaScript", "React", "Node.js", "Python", "PHP", "WordPress", "SEO", "Content Writing", "Digital Marketing", "UI/UX Design", "Copywriting", "Social Media Management", "HTML/CSS", "Tailwind CSS"],
    competitionLevel: "Medium",
    beginnerFriendliness: 6,
    avgHourlyRate: "$15-$70+",
    description: "UK-based platform connecting businesses with skilled freelancers",
    category: "General",
  },
  {
    id: "kaggle",
    name: "Kaggle",
    logo: "📊",
    skillFocus: ["Machine Learning", "Deep Learning", "Data Science", "Data Analysis", "Python", "Pandas", "TensorFlow", "PyTorch", "NLP", "Computer Vision", "R"],
    competitionLevel: "High",
    beginnerFriendliness: 4,
    avgHourlyRate: "Competition-based",
    description: "Data science competition platform with learning and community features",
    category: "Data & AI",
  },
];

export function simulateResumeAnalysis(fileName: string): ResumeAnalysis {
  // Demo simulation
  const demoAnalyses: Record<string, ResumeAnalysis> = {
    default: {
      extractedSkills: ["JavaScript", "React", "TypeScript", "Node.js", "Python", "MongoDB", "REST API", "HTML/CSS", "Git"],
      domain: "Full Stack Web Development",
      experienceYears: 3,
      strengthScore: 72,
      summary: "Mid-level full-stack developer with strong frontend expertise in React ecosystem and backend experience with Node.js. Shows aptitude for modern web technologies.",
      highlights: [
        "Strong React and TypeScript proficiency",
        "Full-stack capability with Node.js backend",
        "Experience with modern database systems",
        "REST API design and implementation",
      ],
    },
  };

  return demoAnalyses.default;
}

export function calculateMatchScores(profile: UserProfile): MatchResult[] {
  const allSkills = [
    ...profile.skills,
    ...(profile.resumeAnalysis?.extractedSkills || []),
  ];
  const uniqueSkills = [...new Set(allSkills)];
  const expLevel = EXPERIENCE_LEVELS.find(e => e.value === profile.experienceLevel);
  const expYears = expLevel?.years || 1;

  return PLATFORMS.map(platform => {
    // Skill match
    const matchedSkills = uniqueSkills.filter(s =>
      platform.skillFocus.some(ps => ps.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(ps.toLowerCase()))
    );
    const skillMatchScore = platform.skillFocus.length > 0
      ? Math.min((matchedSkills.length / Math.min(platform.skillFocus.length, 6)) * 100, 100)
      : 0;

    // Experience match
    let experienceMatchScore = 0;
    if (platform.beginnerFriendliness >= 7 && expYears <= 2) experienceMatchScore = 90;
    else if (platform.beginnerFriendliness >= 5 && expYears >= 2) experienceMatchScore = 80;
    else if (platform.beginnerFriendliness <= 3 && expYears >= 5) experienceMatchScore = 95;
    else if (platform.beginnerFriendliness <= 3 && expYears < 3) experienceMatchScore = 30;
    else experienceMatchScore = 60;

    // Interest alignment
    const interestKeywords: Record<string, string[]> = {
      "Web Development": ["JavaScript", "React", "Angular", "Vue.js", "Node.js", "HTML/CSS", "PHP"],
      "Mobile App Development": ["Mobile Development", "React Native", "Flutter", "Swift", "Kotlin"],
      "Data Science & AI": ["Machine Learning", "Deep Learning", "Data Science", "Python", "TensorFlow", "PyTorch", "NLP"],
      "Graphic Design": ["Graphic Design", "Photoshop", "Illustrator", "Figma", "Adobe XD"],
      "Content Writing": ["Content Writing", "Copywriting", "SEO"],
      "Video Production": ["Video Editing", "Motion Graphics", "3D Modeling"],
      "Digital Marketing": ["Digital Marketing", "SEO", "Social Media Management"],
      "DevOps & Cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "DevOps", "CI/CD"],
      "UI/UX Design": ["UI/UX Design", "Figma", "Adobe XD"],
      "Blockchain & Crypto": ["Blockchain", "Solidity", "Web3"],
    };

    let interestAlignmentScore = 0;
    if (profile.interests.length > 0) {
      const interestRelatedSkills = profile.interests.flatMap(i => interestKeywords[i] || []);
      const interestOverlap = interestRelatedSkills.filter(s =>
        platform.skillFocus.some(ps => ps.toLowerCase() === s.toLowerCase())
      );
      interestAlignmentScore = Math.min((interestOverlap.length / Math.max(profile.interests.length * 2, 1)) * 100, 100);
    }

    // Weighted score: Skills 50%, Experience 25%, Interest 25%
    const overallScore = Math.round(
      skillMatchScore * 0.5 + experienceMatchScore * 0.25 + interestAlignmentScore * 0.25
    );

    const missingSkills = platform.skillFocus
      .filter(ps => !uniqueSkills.some(s => s.toLowerCase().includes(ps.toLowerCase()) || ps.toLowerCase().includes(s.toLowerCase())))
      .slice(0, 5);

    const confidenceLevel: "High" | "Medium" | "Low" =
      overallScore >= 70 ? "High" : overallScore >= 45 ? "Medium" : "Low";

    // Generate reasons
    const reasons: string[] = [];
    if (skillMatchScore >= 60) reasons.push(`Strong skill alignment with ${matchedSkills.length} matching skills`);
    else if (skillMatchScore >= 30) reasons.push(`Partial skill match with ${matchedSkills.length} relevant skills`);
    else reasons.push("Limited skill overlap — consider building platform-specific skills");

    if (experienceMatchScore >= 70) reasons.push(`Your experience level is well-suited for ${platform.name}'s market`);
    if (platform.beginnerFriendliness >= 7) reasons.push("Beginner-friendly platform with good onboarding");
    if (platform.competitionLevel === "Low" || platform.competitionLevel === "Medium") reasons.push("Lower competition increases your chances of landing projects");
    if (interestAlignmentScore >= 50) reasons.push("Your interests align well with the platform's focus areas");

    return {
      platform,
      overallScore,
      skillMatchScore: Math.round(skillMatchScore),
      experienceMatchScore: Math.round(experienceMatchScore),
      interestAlignmentScore: Math.round(interestAlignmentScore),
      confidenceLevel,
      matchedSkills,
      missingSkills,
      reasons,
    };
  }).sort((a, b) => b.overallScore - a.overallScore);
}
