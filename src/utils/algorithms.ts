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

// Layout Optimization Algorithm
export const optimizeLayout = (screenWidth: number) => {
  if (screenWidth < 640) {
    return {
      columns: 1,
      spacing: 'space-y-4',
      fontSize: 'text-sm',
      padding: 'p-4'
    };
  } else if (screenWidth < 1024) {
    return {
      columns: 2,
      spacing: 'space-y-6',
      fontSize: 'text-base',
      padding: 'p-6'
    };
  }
  return {
    columns: 2,
    spacing: 'space-y-8',
    fontSize: 'text-base',
    padding: 'p-8'
  };
};

// Content Priority Algorithm
export const prioritizeContent = (sections: Array<{ type: string; content: any }>) => {
  const priorityOrder = {
    'personal': 1,
    'experience': 2,
    'education': 3,
    'skills': 4,
    'additional': 5
  };

  return sections.sort((a, b) => {
    const priorityA = priorityOrder[a.type as keyof typeof priorityOrder] || 999;
    const priorityB = priorityOrder[b.type as keyof typeof priorityOrder] || 999;
    return priorityA - priorityB;
  });
};

// Typography Scale Algorithm
export const calculateTypographyScale = (baseSize: number) => {
  return {
    xs: `${baseSize * 0.75}px`,
    sm: `${baseSize * 0.875}px`,
    base: `${baseSize}px`,
    lg: `${baseSize * 1.125}px`,
    xl: `${baseSize * 1.25}px`,
    '2xl': `${baseSize * 1.5}px`,
    '3xl': `${baseSize * 1.875}px`,
    '4xl': `${baseSize * 2.25}px`
  };
};

// Color Contrast Algorithm
export const ensureAccessibleContrast = (backgroundColor: string, textColor: string) => {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r / 255, g / 255, b / 255].map(val => 
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const bg = hexToRgb(backgroundColor);
  const text = hexToRgb(textColor);
  
  if (!bg || !text) return false;

  const contrast = (Math.max(getLuminance(bg.r, bg.g, bg.b), getLuminance(text.r, text.g, text.b)) + 0.05) /
                  (Math.min(getLuminance(bg.r, bg.g, bg.b), getLuminance(text.r, text.g, text.b)) + 0.05);

  return contrast >= 4.5; // WCAG AA standard for normal text
};

// Content Density Algorithm
export const calculateContentDensity = (contentLength: number, containerHeight: number) => {
  const idealDensity = 0.7; // 70% content to white space ratio
  const currentDensity = contentLength / containerHeight;

  if (currentDensity > idealDensity) {
    return {
      spacing: 'space-y-2',
      padding: 'p-2',
      lineHeight: 'leading-tight'
    };
  } else if (currentDensity < idealDensity * 0.5) {
    return {
      spacing: 'space-y-6',
      padding: 'p-6',
      lineHeight: 'leading-relaxed'
    };
  }
  return {
    spacing: 'space-y-4',
    padding: 'p-4',
    lineHeight: 'leading-normal'
  };
};
