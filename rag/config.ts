import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local file
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

/** OpenAI config */
if (!process.env.VITE_OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");

export const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

/** Supabase config */
const privateKey = process.env.VITE_SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var VITE_SUPABASE_API_KEY`);

const url = process.env.VITE_SUPABASE_URL;
if (!url) throw new Error(`Expected env var VITE_SUPABASE_URL`);

export const supabase = createClient(url, privateKey); 