'use server';

import { generateSustainabilityTips } from '@/ai/flows/generate-sustainability-tips';
import { z } from 'zod';

const inputSchema = z.object({
  habits: z.string().min(1, { message: 'Habits cannot be empty.' }),
});

export async function generateSustainabilityTipsAction(input: { habits: string }) {
  const parsedInput = inputSchema.safeParse(input);
  if (!parsedInput.success) {
    // Using `failure` to return structured error information
    return { failure: parsedInput.error.format() };
  }
  
  try {
    const output = await generateSustainabilityTips(parsedInput.data);
    return { success: output };
  } catch (e) {
    console.error(e);
    // Returning a generic error message to the client
    return { failure: 'An error occurred while generating tips. Please try again later.' };
  }
}
