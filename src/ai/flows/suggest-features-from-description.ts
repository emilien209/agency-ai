'use server';
/**
 * @fileOverview A feature suggestion AI agent that suggests features based on a description.
 *
 * - suggestFeaturesFromDescription - A function that handles the feature suggestion process.
 * - SuggestFeaturesInput - The input type for the suggestFeaturesFromDescription function.
 * - SuggestFeaturesOutput - The return type for the suggestFeaturesFromDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestFeaturesInputSchema = z.object({
  description: z.string().describe('The description of the app to suggest features for.'),
});
export type SuggestFeaturesInput = z.infer<typeof SuggestFeaturesInputSchema>;

const SuggestFeaturesOutputSchema = z.object({
  features: z.array(z.string()).describe('The suggested features.'),
});
export type SuggestFeaturesOutput = z.infer<typeof SuggestFeaturesOutputSchema>;

export const suggestFeaturesFromDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestFeaturesFromDescriptionFlow',
    inputSchema: SuggestFeaturesInputSchema,
    outputSchema: SuggestFeaturesOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are a feature suggestion AI.
Based on the following application description, suggest a list of features that would be appropriate for the application.

Description:
${input.description}

Provide a list of 5-10 features.
`,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: SuggestFeaturesOutputSchema,
      },
    });

    return output!;
  }
);
