import { toast } from "@/hooks/use-toast";

interface UserPreferences {
  emailNotifications: boolean;
  inAppNotifications: boolean;
  notificationFrequency: number; // in hours
}

interface UserBehavior {
  lastLogin: Date;
  resumeProgress: number;
  premiumFeatures: boolean;
  interactionCount: number;
}

export const DEFAULT_NOTIFICATION_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

export const notificationTypes = {
  RESUME_TIPS: 'resume_tips',
  JOB_SUGGESTIONS: 'job_suggestions',
  PREMIUM_FEATURES: 'premium_features',
  PROGRESS_UPDATE: 'progress_update'
} as const;

export const getNotificationContent = (type: keyof typeof notificationTypes, userBehavior: UserBehavior) => {
  const content = {
    resume_tips: {
      title: "Resume Writing Tip",
      description: userBehavior.resumeProgress < 50 
        ? "Complete your resume sections to improve visibility!"
        : "Polish your resume with our advanced formatting tools!"
    },
    job_suggestions: {
      title: "Job Matches Found",
      description: "New job opportunities matching your profile are available."
    },
    premium_features: {
      title: "Unlock Premium Features",
      description: "Get access to advanced resume templates and AI analysis."
    },
    progress_update: {
      title: "Resume Progress Update",
      description: `Your resume is ${userBehavior.resumeProgress}% complete. Keep going!`
    }
  };

  return content[type];
};

export const shouldSendNotification = (
  userBehavior: UserBehavior,
  lastNotification: Date
): boolean => {
  const timeSinceLastNotification = Date.now() - lastNotification.getTime();
  return timeSinceLastNotification >= DEFAULT_NOTIFICATION_INTERVAL;
};

export const determineNotificationType = (userBehavior: UserBehavior): keyof typeof notificationTypes => {
  if (userBehavior.resumeProgress < 100) {
    return 'PROGRESS_UPDATE';
  }
  if (!userBehavior.premiumFeatures && userBehavior.interactionCount > 5) {
    return 'PREMIUM_FEATURES';
  }
  if (userBehavior.resumeProgress === 100) {
    return 'JOB_SUGGESTIONS';
  }
  return 'RESUME_TIPS';
};

export const sendNotification = (
  type: keyof typeof notificationTypes,
  userBehavior: UserBehavior,
  preferences: UserPreferences
) => {
  const content = getNotificationContent(type, userBehavior);

  // Send in-app notification
  if (preferences.inAppNotifications) {
    toast({
      title: content.title,
      description: content.description,
      duration: 5000,
    });
  }

  // For email notifications, we'll use the existing email service
  if (preferences.emailNotifications) {
    // Implement email sending logic here when email service is available
    console.log('Email notification:', content);
  }
};

export const initializeNotificationSystem = (
  userBehavior: UserBehavior,
  preferences: UserPreferences
) => {
  let lastNotification = new Date(0); // Initialize to past date

  const checkAndSendNotification = () => {
    if (shouldSendNotification(userBehavior, lastNotification)) {
      const notificationType = determineNotificationType(userBehavior);
      sendNotification(notificationType, userBehavior, preferences);
      lastNotification = new Date();
    }
  };

  // Initial check
  checkAndSendNotification();

  // Set up interval for periodic checks
  const intervalId = setInterval(
    checkAndSendNotification,
    preferences.notificationFrequency * 60 * 60 * 1000
  );

  // Cleanup function
  return () => clearInterval(intervalId);
};