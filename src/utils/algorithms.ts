// Resume Score Algorithm
export const calculateResumeScore = (resumeData: any): number => {
  let score = 0;
  const maxScore = 100;

  // Personal Info completeness (20%)
  if (resumeData.personal) {
    if (resumeData.personal.fullName) score += 5;
    if (resumeData.personal.email) score += 5;
    if (resumeData.personal.phone) score += 5;
    if (resumeData.personal.website) score += 5;
  }

  // Experience quality (35%)
  if (resumeData.experience && resumeData.experience.length > 0) {
    const expScore = Math.min(resumeData.experience.length * 10, 20);
    score += expScore;

    // Check description quality
    const hasDetailedDescriptions = resumeData.experience.every(
      (exp: any) => exp.description && exp.description.length > 50
    );
    if (hasDetailedDescriptions) score += 15;
  }

  // Education assessment (25%)
  if (resumeData.education && resumeData.education.length > 0) {
    score += 15;
    const hasRecentEducation = resumeData.education.some((edu: any) => {
      const endYear = edu.endDate ? new Date(edu.endDate).getFullYear() : new Date().getFullYear();
      return endYear >= new Date().getFullYear() - 5;
    });
    if (hasRecentEducation) score += 10;
  }

  // Skills evaluation (20%)
  if (resumeData.skills && resumeData.skills.length > 0) {
    const skillScore = Math.min(resumeData.skills.length * 2, 20);
    score += skillScore;
  }

  return Math.min(score, maxScore);
};

// ATS Keyword Matching Algorithm
export const calculateATSMatch = (resumeText: string, jobDescription: string): number => {
  const normalizeText = (text: string): string[] => {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  };

  const resumeWords = new Set(normalizeText(resumeText));
  const jobWords = normalizeText(jobDescription);
  const uniqueJobWords = new Set(jobWords);

  let matches = 0;
  uniqueJobWords.forEach(word => {
    if (resumeWords.has(word)) matches++;
  });

  return Math.round((matches / uniqueJobWords.size) * 100);
};

// Interview Question Generator Algorithm
export const generateInterviewQuestions = (skills: string[]): string[] => {
  const questionTemplates = [
    "Can you describe a project where you used {skill}?",
    "What's your experience level with {skill}?",
    "How do you stay updated with the latest developments in {skill}?",
    "What challenges have you faced while working with {skill}?",
    "How would you explain {skill} to a non-technical person?"
  ];

  const questions = skills.flatMap(skill =>
    questionTemplates.map(template =>
      template.replace("{skill}", skill)
    )
  );

  // Shuffle and limit questions
  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);
};

// Skill Relevance Algorithm
export const analyzeSkillRelevance = (
  skills: string[],
  jobTitle: string
): { relevant: string[], missing: string[] } => {
  // Common skill mappings for different job titles
  const skillMappings: Record<string, string[]> = {
    "frontend developer": [
      "html",
      "css",
      "javascript",
      "react",
      "typescript",
      "responsive design",
      "git"
    ],
    "backend developer": [
      "nodejs",
      "python",
      "databases",
      "api design",
      "sql",
      "git",
      "server management"
    ],
    "fullstack developer": [
      "html",
      "css",
      "javascript",
      "react",
      "nodejs",
      "databases",
      "git"
    ],
    "data scientist": [
      "python",
      "r",
      "machine learning",
      "statistics",
      "sql",
      "data visualization",
      "jupyter"
    ]
  };

  const normalizedJobTitle = jobTitle.toLowerCase();
  const requiredSkills = skillMappings[normalizedJobTitle] || [];
  const normalizedUserSkills = skills.map(skill => skill.toLowerCase());

  const relevant = normalizedUserSkills.filter(skill =>
    requiredSkills.includes(skill)
  );

  const missing = requiredSkills.filter(skill =>
    !normalizedUserSkills.includes(skill)
  );

  return { relevant, missing };
};