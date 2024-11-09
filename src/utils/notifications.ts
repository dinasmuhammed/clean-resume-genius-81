import { toast } from "@/hooks/use-toast";

const keralaCities = [
  "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam",
  "Alappuzha", "Palakkad", "Malappuram", "Kannur", "Kottayam"
];

const malayalamNames = [
  "Arjun", "Arun", "Deepak", "Rahul", "Vijay",
  "Anjali", "Divya", "Meera", "Priya", "Sreeja"
];

export const generateNotification = () => {
  const randomName = malayalamNames[Math.floor(Math.random() * malayalamNames.length)];
  const randomCity = keralaCities[Math.floor(Math.random() * keralaCities.length)];
  
  return {
    name: randomName,
    place: randomCity,
    timestamp: new Date()
  };
};

export const showRealtimeNotification = () => {
  const notification = generateNotification();
  
  toast({
    title: "New Resume Created! 🎉",
    description: `${notification.name} from ${notification.place} just created their resume`,
    duration: 3000
  });
};

let notificationInterval: NodeJS.Timeout;

export const startRealtimeNotifications = () => {
  // Show notifications every 30-60 seconds
  notificationInterval = setInterval(() => {
    showRealtimeNotification();
  }, Math.random() * (60000 - 30000) + 30000);
};

export const stopRealtimeNotifications = () => {
  if (notificationInterval) {
    clearInterval(notificationInterval);
  }
};