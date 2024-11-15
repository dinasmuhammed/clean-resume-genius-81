interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const malayalamNames = [
  "Arun Kumar",
  "Deepa Menon",
  "Krishnan Nair",
  "Lakshmi Devi",
  "Mohan Das",
  "Priya Raj",
  "Rajesh Pillai",
  "Sreeja Nair",
  "Thomas Kurian",
  "Vijayan K P",
  "Anitha Kumari",
  "Biju Joseph",
  "Divya Krishnan",
  "Gopan Nair",
  "Mini George"
];

const reviewTemplates = [
  "പ്ലാറ്റ്ഫോം വളരെ ഉപയോഗപ്രദമാണ്. {positive}",
  "Great platform! {positive} Really helped me create a professional resume.",
  "നല്ല അനുഭവം. {positive} Resume builder വളരെ എളുപ്പമാണ്.",
  "Excellent service. {positive} The ATS checker was particularly useful.",
  "Simple and effective. {positive} Helped me land my dream job.",
  "പെർഫെക്റ്റ് ആയിരുന്നു. {neutral} But could add more Kerala-specific templates.",
  "Good experience overall. {neutral} Some Malayalam support would be nice.",
  "Useful platform. {neutral} Looking forward to more local features.",
  "Decent service. {negative} Need more regional language support.",
  "Could be better. {negative} Interface needs more Kerala-specific elements."
];

const positivePoints = [
  "Very user-friendly interface.",
  "Helped me create a professional CV.",
  "വളരെ നല്ല സേവനം.",
  "Excellent customer support.",
  "Perfect for IT professionals in Kerala."
];

const neutralPoints = [
  "Decent features.",
  "Standard resume templates.",
  "Basic functionality works well.",
  "Meets expectations.",
  "Regular updates would be nice."
];

const negativePoints = [
  "Need more Malayalam support.",
  "Could improve local features.",
  "More Kerala-specific templates needed.",
  "Interface could be more intuitive.",
  "Limited regional customization."
];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRating = (): number => {
  // Bias towards positive ratings (3.5-5.0)
  return Math.floor(Math.random() * 15 + 35) / 10;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const generateKeralaReview = (): Review => {
  const rating = generateRating();
  let reviewTemplate = getRandomElement(reviewTemplates);
  let sentiment: string;

  // Choose sentiment based on rating
  if (rating >= 4.0) {
    sentiment = getRandomElement(positivePoints);
    reviewTemplate = reviewTemplate.replace("{positive}", sentiment);
  } else if (rating >= 3.0) {
    sentiment = getRandomElement(neutralPoints);
    reviewTemplate = reviewTemplate.replace("{neutral}", sentiment);
  } else {
    sentiment = getRandomElement(negativePoints);
    reviewTemplate = reviewTemplate.replace("{negative}", sentiment);
  }

  // Generate random date within last 3 months
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 90));

  return {
    name: getRandomElement(malayalamNames),
    rating,
    text: reviewTemplate.replace(/{positive}|{neutral}|{negative}/g, ""),
    date: formatDate(date)
  };
};

export const generateMultipleReviews = (count: number): Review[] => {
  return Array.from({ length: count }, () => generateKeralaReview());
};