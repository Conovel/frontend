import { ViewSentence } from '../types/api';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const fetchSentence = async (
  sentenceId: string,
): Promise<ViewSentence> => {
  const response = await fetch(`${API_BASE_URL}/api/sentences/${sentenceId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch sentence: ${response.statusText}`);
  }

  return response.json();
};
