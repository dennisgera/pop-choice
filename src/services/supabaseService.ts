import { supabase } from "../../config";

interface Match {
  content: string;
  id: number;
  similarity: number;
}

export const findNearestMatch = async (embedding: number[]): Promise<string[]> => {
  const { data, error } = await supabase.rpc("match_movies", {
    query_embedding: embedding,
    match_threshold: 0.1,
    match_count: 3,
  });
  
  if (error) {
    console.error(error);
    throw new Error(`Failed to find nearest match ${error}`);
  }
  
  return data.map((obj: Match) => obj.content);
}; 