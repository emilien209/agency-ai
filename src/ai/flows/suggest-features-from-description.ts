'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting project features based on a user-provided description.
 *
 * The flow takes a project description as input and uses a language model to suggest relevant features.
 * It exports the SuggestFeaturesFromDescriptionInput and SuggestFeaturesFromDescriptionOutput types, as well as the suggestFeaturesFromDescription function to call the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFeaturesFromDescriptionInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the project to be generated.'),
});
export type SuggestFeaturesFromDescriptionInput = z.infer<
  typeof SuggestFeaturesFromDescriptionInputSchema
>;

const SuggestFeaturesFromDescriptionOutputSchema = z.object({
  suggestedFeatures: z
    .array(z.string())
    .describe('A list of suggested features for the project.'),
});
export type SuggestFeaturesFromDescriptionOutput = z.infer<
  typeof SuggestFeaturesFromDescriptionOutputSchema
>;

export async function suggestFeaturesFromDescription(
  input: SuggestFeaturesFromDescriptionInput
): Promise<SuggestFeaturesFromDescriptionOutput> {
  return suggestFeaturesFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFeaturesFromDescriptionPrompt',
  input: {schema: SuggestFeaturesFromDescriptionInputSchema},
  output: {schema: SuggestFeaturesFromDescriptionOutputSchema},
  prompt: `You are a project architect. Based on the following project description, suggest a list of features that would be beneficial to the project. Respond as a JSON array of strings.

Project Description: {{{projectDescription}}} `,
});

const suggestFeaturesFromDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestFeaturesFromDescriptionFlow',
    inputSchema: SuggestFeaturesFromDescriptionInputSchema,
    outputSchema: SuggestFeaturesFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
