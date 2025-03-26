import { Movie, createEmbedding, getChatCompletion, verifyAndFixJSON } from "./openaiService";
import { findNearestMatch } from "./supabaseService";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const SYSTEM_PROMPT: ChatCompletionMessageParam = {
  role: "system",
  content: `
    You are a helpful assistant that recommends movies based on the user's preferences.
    You will be given a list of movies and the user's preferences.
    You need to recommend the most relevant movie to the user's preferences.        
    Your answer should be in the following JSON format:
    {"title": "[Movie Title]"
    "description": "[Movie Description]"}

    The following is an example of the answer format:
    ###
    Example:
    {"title": "The Dark Knight"
    "description": "A superhero movie about a man who becomes a vigilante to fight crime and protect the city."}
    ###
  `,
};

export const getMovieRecommendation = async (
  userPreferences: Record<string, string>
): Promise<Movie> => {
  try {
    // Create embedding from all user answers
    const allAnswers = Object.values(userPreferences).join(" ");
    const embedding = await createEmbedding(allAnswers);

    // Find matching movies
    const matchingMovies = await findNearestMatch(embedding);

    // Get recommendation from OpenAI
    const messages: ChatCompletionMessageParam[] = [
      SYSTEM_PROMPT,
      {
        role: "user",
        content: `
          Movies: ${matchingMovies.join("\n")}
          User Preferences: ${JSON.stringify(userPreferences)}
        `,
      },
    ];

    const chatResult = await getChatCompletion(messages);
    return await verifyAndFixJSON(chatResult);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get movie recommendation: ${error}`);
  }
}; 