import { HfInference } from '@huggingface/inference';

const HUGGING_FACE_TOKEN = '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';
const inference = new HfInference(HUGGING_FACE_TOKEN);

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const cache = new Map<string, { data: any; timestamp: number }>();

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (!cached) return null;
  
  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
  if (isExpired) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const analyzeResume = async (resumeText: string) => {
  const cacheKey = `analyze_${resumeText}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const response = await inference.textClassification({
      model: 'facebook/bart-large-mnli',
      inputs: resumeText,
    });
    
    setCachedData(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

export const generateJobSuggestions = async (skills: string[]) => {
  const skillsKey = skills.sort().join(',');
  const cacheKey = `suggestions_${skillsKey}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const prompt = `Given these skills: ${skills.join(', ')}, suggest relevant job positions.`;
    const response = await inference.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: {
        max_length: 100,
        temperature: 0.7,
      },
    });
    
    setCachedData(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error generating job suggestions:', error);
    throw error;
  }
};

export const improveResumeText = async (text: string) => {
  const cacheKey = `improve_${text}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const prompt = `Improve this resume text professionally: ${text}`;
    const response = await inference.textGeneration({
      model: 'gpt2',
      inputs: prompt,
      parameters: {
        max_length: 200,
        temperature: 0.8,
      },
    });
    
    setCachedData(cacheKey, response);
    return response;
  } catch (error) {
    console.error('Error improving resume text:', error);
    throw error;
  }
};