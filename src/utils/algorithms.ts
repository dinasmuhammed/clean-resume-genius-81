
// Resume Score Algorithm
export const calculateResumeScore = (resumeData: any): number => {
  if (!resumeData) return 0;
  
  let score = 0;
  const maxScore = 100;

  // Personal Info completeness (15%)
  if (resumeData.personal) {
    if (resumeData.personal.fullName?.trim()) score += 4;
    if (resumeData.personal.email?.trim()) score += 4;
    if (resumeData.personal.phone?.trim()) score += 4;
    if (resumeData.personal.website?.trim()) score += 3;
  }

  // Professional Summary (20%)
  if (resumeData.personal?.summary) {
    const summary = resumeData.personal.summary.trim();
    if (summary.length > 0) {
      score += 10;
      // Additional points for comprehensive summary
      if (summary.length > 200) score += 10;
      else if (summary.length > 100) score += 5;
    }
  }

  // Experience quality (30%)
  if (Array.isArray(resumeData.experience) && resumeData.experience.length > 0) {
    // Base points for having experience
    score += Math.min(resumeData.experience.length * 5, 10);

    // Check description quality and achievements/metrics
    let detailedDescriptionsCount = 0;
    let containsMetricsCount = 0;
    
    resumeData.experience.forEach((exp: any) => {
      if (exp?.description?.trim()?.length > 50) detailedDescriptionsCount++;
      
      // Check for metrics/achievements (numbers, percentages, etc.)
      if (exp?.description?.match(/\d+%|\d+ percent|increased|improved|reduced|achieved|delivered|managed|led|created|developed|implemented/i)) {
        containsMetricsCount++;
      }
    });
    
    // Add points based on quality ratio
    const descQualityRatio = detailedDescriptionsCount / resumeData.experience.length;
    score += Math.round(descQualityRatio * 10);
    
    const metricsRatio = containsMetricsCount / resumeData.experience.length;
    score += Math.round(metricsRatio * 10);
  }

  // Education assessment (15%)
  if (Array.isArray(resumeData.education) && resumeData.education.length > 0) {
    score += 10;
    const hasRecentEducation = resumeData.education.some((edu: any) => {
      if (!edu?.endDate) return true; // Current education
      const endYear = new Date(edu.endDate).getFullYear();
      return endYear >= new Date().getFullYear() - 5;
    });
    if (hasRecentEducation) score += 5;
  }

  // Skills evaluation (20%)
  if (Array.isArray(resumeData.skills) && resumeData.skills.length > 0) {
    // Basic points for having skills
    const skillPoints = Math.min(resumeData.skills.length * 2, 10);
    score += skillPoints;
    
    // Additional points for variety and relevance
    if (resumeData.skills.length >= 10) score += 5;
    if (resumeData.skills.length >= 5) score += 5;
  }

  // Ensure minimum 80% ATS compatibility for completed resumes
  if (score > 0) {
    const hasBasicElements = 
      resumeData.personal?.fullName && 
      resumeData.personal?.email && 
      resumeData.skills?.length > 0 && 
      (resumeData.experience?.length > 0 || resumeData.education?.length > 0);
      
    if (hasBasicElements && score < 80) {
      score = 80;
    }
  }

  return Math.min(score, maxScore);
};

// ATS Keyword Matching Algorithm
export const calculateATSMatch = (resumeText: string, jobDescription: string): number => {
  if (!resumeText?.trim() || !jobDescription?.trim()) return 0;

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

  return Math.round((matches / Math.max(uniqueJobWords.size, 1)) * 100);
};

// Interview Question Generator Algorithm
export const generateInterviewQuestions = (skills: string[]): string[] => {
  if (!Array.isArray(skills) || skills.length === 0) return [];

  const questionTemplates = [
    "Can you describe a project where you used {skill}?",
    "What's your experience level with {skill}?",
    "How do you stay updated with the latest developments in {skill}?",
    "What challenges have you faced while working with {skill}?",
    "How would you explain {skill} to a non-technical person?"
  ];

  const questions = skills.flatMap(skill =>
    questionTemplates.map(template =>
      template.replace("{skill}", skill.trim())
    )
  );

  // Shuffle and limit questions
  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(10, questions.length));
};

// Skill Relevance Algorithm
export const analyzeSkillRelevance = (
  skills: string[],
  jobTitle: string
): { relevant: string[], missing: string[] } => {
  if (!Array.isArray(skills) || !jobTitle?.trim()) {
    return { relevant: [], missing: [] };
  }

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

  const normalizedJobTitle = jobTitle.toLowerCase().trim();
  const requiredSkills = skillMappings[normalizedJobTitle] || [];
  const normalizedUserSkills = skills.map(skill => skill.toLowerCase().trim());

  const relevant = normalizedUserSkills.filter(skill =>
    requiredSkills.includes(skill)
  );

  const missing = requiredSkills.filter(skill =>
    !normalizedUserSkills.includes(skill)
  );

  return { relevant, missing };
};

// Add new export at the end of the file
export { generateKeralaReview, generateMultipleReviews } from './keralareviewGenerator';
