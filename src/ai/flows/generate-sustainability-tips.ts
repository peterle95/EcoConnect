// src/ai/flows/generate-sustainability-tips.ts
'use server';
/**
 * @fileOverview Generates personalized sustainability tips based on user habits.
 *
 * - generateSustainabilityTips - A function that generates sustainability tips.
 * - SustainabilityTipsInput - The input type for the generateSustainabilityTips function.
 * - SustainabilityTipsOutput - The return type for the generateSustainabilityTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SustainabilityTipsInputSchema = z.object({
  habits: z
    .string()
    .describe(
      'A comma separated list of user habits that impact the environment.'
    ),
});
export type SustainabilityTipsInput = z.infer<typeof SustainabilityTipsInputSchema>;

const SustainabilityTipsOutputSchema = z.object({
  tips: z.string().describe('A list of personalized sustainability tips.'),
});
export type SustainabilityTipsOutput = z.infer<typeof SustainabilityTipsOutputSchema>;

export async function generateSustainabilityTips(
  input: SustainabilityTipsInput
): Promise<SustainabilityTipsOutput> {
  return generateSustainabilityTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sustainabilityTipsPrompt',
  input: {schema: SustainabilityTipsInputSchema},
  output: {schema: SustainabilityTipsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized sustainability tips based on user habits.

  Given the following habits, please provide a list of actionable tips to reduce their environmental impact:

  Habits: {{{habits}}}
  `,
});

const generateSustainabilityTipsFlow = ai.defineFlow(
  {
    name: 'generateSustainabilityTipsFlow',
    inputSchema: SustainabilityTipsInputSchema,
    outputSchema: SustainabilityTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
