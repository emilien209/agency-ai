'use server';
/**
 * @fileOverview A code generation AI agent that writes code based on a description.
 *
 * - generateCodeFromDescription - A function that handles the code generation process.
 * - GenerateCodeInput - The input type for the generateCodeFromDescription function.
 * - GenerateCodeOutput - The return type for the generateCodeFrom-description function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCodeInputSchema = z.object({
  description: z.string().describe('The description of the app to generate.'),
  features: z.array(z.string()).optional().describe('The features to include in the generated code.'),
  framework: z.string().optional().describe('The framework to use for the generated code.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

const GenerateCodeOutputSchema = z.object({
  code: z.string().describe('The generated code.'),
});
export type GenerateCodeOutput = z.infer<typeof GenerateCodeOutputSchema>;


export const generateCodeFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCodeFromDescriptionFlow',
    inputSchema: GenerateCodeInputSchema,
    outputSchema: GenerateCodeOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `You are a code generation AI.
Generate code for an application based on the following description:

Description:
${input.description}

Selected Features:
${(input.features ?? []).join('\n- ')}

Framework:
${input.framework ?? 'Next.js'}

Please generate the complete, self-contained code for the main component of the application.
`,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: GenerateCodeOutputSchema,
      },
    });

    return output!;
  }
);
