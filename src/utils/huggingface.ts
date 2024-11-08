import { HfInference } from '@huggingface/inference';

const HUGGING_FACE_TOKEN = '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';
const inference = new HfInference(HUGGING_FACE_TOKEN);

export const analyzeResume = async (resumeText: string) => {
  try {
    const response = await inference.textClassification({
      model: 'facebook/bart-large-mnli',
      inputs: resumeText,
    });
    return response;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

export const generateJobSuggestions = async (skills: string[]) => {
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
    return response;
  } catch (error) {
    console.error('Error generating job suggestions:', error);
    throw error;
  }
};

export const improveResumeText = async (text: string) => {
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
    return response;
  } catch (error) {
    console.error('Error improving resume text:', error);
    throw error;
  }
};