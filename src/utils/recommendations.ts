export interface UserProfile {
  id: string;
  preferences: {
    categories: { [key: string]: number };
    interactions: Array<{
      contentId: string;
      type: string;
      timestamp: Date;
    }>;
  };
}

export const createUserProfile = (userId: string): UserProfile => {
  return {
    id: userId,
    preferences: {
      categories: {},
      interactions: [],
    },
  };
};

export const updateUserPreferences = async (
  profile: UserProfile,
  interaction: {
    contentId: string;
    type: string;
    categories: string[];
  }
): Promise<UserProfile> => {
  const updatedProfile = { ...profile };
  
  // Update category preferences
  interaction.categories.forEach(category => {
    updatedProfile.preferences.categories[category] = 
      (updatedProfile.preferences.categories[category] || 0) + 1;
  });

  // Add interaction to history
  updatedProfile.preferences.interactions.push({
    contentId: interaction.contentId,
    type: interaction.type,
    timestamp: new Date(),
  });

  return updatedProfile;
};

export const getPersonalizedRecommendations = async (
  profile: UserProfile,
  content: Array<{ id: string; categories: string[]; timestamp: Date }>
) => {
  // Sort content based on user preferences
  return content.sort((a, b) => {
    const aScore = a.categories.reduce(
      (score, category) => score + (profile.preferences.categories[category] || 0),
      0
    );
    const bScore = b.categories.reduce(
      (score, category) => score + (profile.preferences.categories[category] || 0),
      0
    );
    return bScore - aScore;
  });
};