import { analyzeResume } from './huggingface';

// Export the UserPreference interface
export interface UserPreference {
  category: string;
  weight: number;
  lastInteraction: Date;
}

// Export the UserProfile interface
export interface UserProfile {
  id: string;
  preferences: UserPreference[];
  viewHistory: string[];
  clickHistory: string[];
}

// Decay factor for older interactions
const DECAY_FACTOR = 0.1;

export const calculateContentScore = (
  content: { id: string; categories: string[]; timestamp: Date },
  userProfile: UserProfile
): number => {
  let score = 0;

  // Calculate time-weighted preference score
  userProfile.preferences.forEach((pref) => {
    if (content.categories.includes(pref.category)) {
      const timeDiff = (new Date().getTime() - pref.lastInteraction.getTime()) / (1000 * 60 * 60 * 24);
      const timeDecay = Math.exp(-DECAY_FACTOR * timeDiff);
      score += pref.weight * timeDecay;
    }
  });

  // Novelty factor - reduce score for recently viewed content
  if (userProfile.viewHistory.includes(content.id)) {
    score *= 0.5;
  }

  return score;
};

export const updateUserPreferences = async (
  userProfile: UserProfile,
  interaction: { contentId: string; type: 'view' | 'click' | 'complete'; categories: string[] }
): Promise<UserProfile> => {
  const now = new Date();
  const updatedPreferences = [...userProfile.preferences];

  // Update weights based on interaction type
  const interactionWeights = {
    view: 0.1,
    click: 0.3,
    complete: 0.6,
  };

  interaction.categories.forEach((category) => {
    const existingPref = updatedPreferences.find((p) => p.category === category);
    if (existingPref) {
      existingPref.weight += interactionWeights[interaction.type];
      existingPref.lastInteraction = now;
    } else {
      updatedPreferences.push({
        category,
        weight: interactionWeights[interaction.type],
        lastInteraction: now,
      });
    }
  });

  // Normalize weights
  const totalWeight = updatedPreferences.reduce((sum, pref) => sum + pref.weight, 0);
  updatedPreferences.forEach((pref) => {
    pref.weight = pref.weight / totalWeight;
  });

  // Update history
  const updatedProfile = {
    ...userProfile,
    preferences: updatedPreferences,
    viewHistory: interaction.type === 'view' 
      ? [...userProfile.viewHistory, interaction.contentId]
      : userProfile.viewHistory,
    clickHistory: interaction.type === 'click'
      ? [...userProfile.clickHistory, interaction.contentId]
      : userProfile.clickHistory,
  };

  return updatedProfile;
};

export const getPersonalizedRecommendations = async (
  userProfile: UserProfile,
  availableContent: Array<{ id: string; categories: string[]; timestamp: Date }>
): Promise<Array<{ id: string; score: number }>> => {
  // Calculate scores for all available content
  const scoredContent = availableContent.map((content) => ({
    id: content.id,
    score: calculateContentScore(content, userProfile),
  }));

  // Sort by score in descending order
  return scoredContent.sort((a, b) => b.score - a.score);
};

// Initialize a new user profile
export const createUserProfile = (userId: string): UserProfile => ({
  id: userId,
  preferences: [],
  viewHistory: [],
  clickHistory: [],
});
