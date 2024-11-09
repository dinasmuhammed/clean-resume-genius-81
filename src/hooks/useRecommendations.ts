import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getPersonalizedRecommendations, 
  updateUserPreferences, 
  createUserProfile,
  UserProfile 
} from '../utils/recommendations';

export const useRecommendations = (userId: string) => {
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: userProfile } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      // In a real app, this would fetch from your backend
      const profile = localStorage.getItem(`userProfile_${userId}`);
      return profile ? JSON.parse(profile) : createUserProfile(userId);
    },
  });

  // Update user preferences
  const { mutate: trackInteraction } = useMutation({
    mutationFn: async (interaction: {
      contentId: string;
      type: 'view' | 'click' | 'complete';
      categories: string[];
    }) => {
      if (!userProfile) return null;
      const updatedProfile = await updateUserPreferences(userProfile, interaction);
      localStorage.setItem(`userProfile_${userId}`, JSON.stringify(updatedProfile));
      return updatedProfile;
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['userProfile', userId], updatedProfile);
    },
  });

  // Get personalized recommendations
  const getRecommendations = async (content: Array<{ id: string; categories: string[]; timestamp: Date }>) => {
    if (!userProfile) return [];
    return getPersonalizedRecommendations(userProfile, content);
  };

  return {
    userProfile,
    trackInteraction,
    getRecommendations,
  };
};