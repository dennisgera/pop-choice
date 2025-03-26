import { openai } from "../../config";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export interface Movie {
  title: string;
  description: string;
}

export const createEmbedding = async (text: string) => {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return embeddingResponse.data[0].embedding;
};

export const getChatCompletion = async (
  messages: ChatCompletionMessageParam[]
): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.5,
    frequency_penalty: 0.5,
  });
  
  const result = response.choices[0].message.content;
  if (!result) {
    throw new Error("No result from chat completion");
  }
  return result;
};

export const verifyAndFixJSON = async (content: string): Promise<Movie> => {
  const verificationResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
        You are a JSON verification assistant. 
        If the input is not valid JSON, transform it into valid JSON with title and description fields. 
        If it is valid JSON, return it as is.
        `,
      },
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.1,
  });

  const verifiedResult = verificationResponse.choices[0].message.content;
  if (!verifiedResult) {
    throw new Error("No result from verification");
  }

  const resultObj = JSON.parse(verifiedResult) as Movie;
  if (!resultObj.title || !resultObj.description) {
    throw new Error("Invalid result from chat completion");
  }
  return resultObj;
}; 