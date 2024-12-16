import { toast } from "@/hooks/use-toast";

export const initializePushNotifications = async () => {
  try {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      toast({
        title: "Notifications Enabled",
        description: "You'll now receive updates about new features and messages.",
      });
    }
  } catch (error) {
    console.error("Error initializing notifications:", error);
  }
};

export const sendPushNotification = (title: string, options: NotificationOptions) => {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
};