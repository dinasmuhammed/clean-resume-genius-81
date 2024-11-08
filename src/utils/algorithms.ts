type ResumeData = {
  personal?: {
    fullName?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  experience?: Array<{
    description?: string;
    endDate?: string;
  }>;
  education?: Array<{
    endDate?: string;
  }>;
  skills?: string[];
};

const SCORE_WEIGHTS = {
  personal: 0.2,
  experience: 0.35,
  education: 0.25,
  skills: 0.2,
};

export const calculateResumeScore = (resumeData: ResumeData): number => {
  if (!resumeData) return 0;
  
  let score = 0;
  const maxScore = 100;

  // Personal Info Score
  if (resumeData.personal) {
    const fields = ['fullName', 'email', 'phone', 'website'];
    const personalScore = fields.reduce((acc, field) => 
      acc + (resumeData.personal?.[field as keyof typeof resumeData.personal]?.trim() ? 5 : 0), 0);
    score += personalScore;
  }

  // Experience Score
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    const expScore = Math.min(resumeData.experience.length * 10, 20);
    score += expScore;
    
    if (resumeData.experience.every(exp => exp?.description?.trim()?.length > 50)) {
      score += 15;
    }
  }

  // Education Score
  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) {
    score += 15;
    const currentYear = new Date().getFullYear();
    const hasRecentEducation = resumeData.education.some(edu => {
      if (!edu?.endDate) return true;
      const endYear = new Date(edu.endDate).getFullYear();
      return endYear >= currentYear - 5;
    });
    if (hasRecentEducation) score += 10;
  }

  // Skills Score
  if (Array.isArray(resumeData.skills)) {
    score += Math.min(resumeData.skills.length * 2, 20);
  }

  return Math.min(score, maxScore);
};

const normalizeText = (text: string): string[] => 
  text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2);

export const calculateATSMatch = (resumeText: string, jobDescription: string): number => {
  if (!resumeText?.trim() || !jobDescription?.trim()) return 0;

  const resumeWords = new Set(normalizeText(resumeText));
  const jobWords = new Set(normalizeText(jobDescription));

  let matches = 0;
  jobWords.forEach(word => {
    if (resumeWords.has(word)) matches++;
  });

  return Math.round((matches / Math.max(jobWords.size, 1)) * 100);
};

const QUESTION_TEMPLATES = [
  "Can you describe a project where you used {skill}?",
  "What's your experience level with {skill}?",
  "How do you stay updated with the latest developments in {skill}?",
  "What challenges have you faced while working with {skill}?",
  "How would you explain {skill} to a non-technical person?"
];

export const generateInterviewQuestions = (skills: string[]): string[] => {
  if (!Array.isArray(skills) || skills.length === 0) return [];

  return skills
    .flatMap(skill => 
      QUESTION_TEMPLATES.map(template => 
        template.replace("{skill}", skill.trim())
      ))
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(10, skills.length * QUESTION_TEMPLATES.length));
};

const SKILL_MAPPINGS: Record<string, string[]> = {
  "frontend developer": [
    "html", "css", "javascript", "react", "typescript", 
    "responsive design", "git"
  ],
  "backend developer": [
    "nodejs", "python", "databases", "api design", "sql", 
    "git", "server management"
  ],
  "fullstack developer": [
    "html", "css", "javascript", "react", "nodejs", 
    "databases", "git"
  ],
  "data scientist": [
    "python", "r", "machine learning", "statistics", "sql", 
    "data visualization", "jupyter"
  ]
};

export const analyzeSkillRelevance = (
  skills: string[],
  jobTitle: string
): { relevant: string[], missing: string[] } => {
  if (!Array.isArray(skills) || !jobTitle?.trim()) {
    return { relevant: [], missing: [] };
  }

  const normalizedJobTitle = jobTitle.toLowerCase().trim();
  const requiredSkills = SKILL_MAPPINGS[normalizedJobTitle] || [];
  const normalizedUserSkills = skills.map(skill => skill.toLowerCase().trim());

  return {
    relevant: normalizedUserSkills.filter(skill => requiredSkills.includes(skill)),
    missing: requiredSkills.filter(skill => !normalizedUserSkills.includes(skill))
  };
};