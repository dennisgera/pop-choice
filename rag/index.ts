import { openai, supabase } from "../config.ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Embedding {
    content: string;
    embedding: number[];
}

const splitDocument = async (documentPath: string) => {
    const text = await fs.readFile(path.resolve(documentPath), 'utf-8');
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 250,
        chunkOverlap: 35,
    });
    const output = await splitter.createDocuments([text]);
    return output;
}

const createAndStoreEmbeddings = async (documentPath: string, tableName: string) => {
  try {
    const chunkData = await splitDocument(documentPath);
    const data = await Promise.all(chunkData.map(async (chunk) => {
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: chunk.pageContent,
        });
        const embedding = embeddingResponse.data[0].embedding;
        return {
            content: chunk.pageContent,
            embedding,
        } as Embedding;
    }));
    const { error } = await supabase.from(tableName).insert(data);
    if (error) {
        console.error(error);
        throw new Error(`Failed to create embedding: ${error}`);
    }
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(`Failed to create embedding: ${e}`);
  }
};

// Using path.join to create a proper path to the movies.txt file in rag/data
const moviesFilePath = path.join(__dirname, 'data', 'movies.txt');
createAndStoreEmbeddings(moviesFilePath, "movies");
