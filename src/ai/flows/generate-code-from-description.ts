'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating code from a project description.
 *
 * It includes the following:
 * - generateCodeFromDescription: The main function to trigger the code generation flow.
 * - GenerateCodeFromDescriptionInput: The input type for the code generation flow.
 * - GenerateCodeFromDescriptionOutput: The output type for the code generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeFromDescriptionInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the desired application.'),
  languageFramework: z
    .string()
    .describe(
      'The programming language or framework to use for the project (e.g., JavaScript/React, Python/Flask).'
    ),
  projectName: z.string().describe('The name of the project.'),
});
export type GenerateCodeFromDescriptionInput = z.infer<
  typeof GenerateCodeFromDescriptionInputSchema
>;

const GenerateCodeFromDescriptionOutputSchema = z.object({
  generatedCode: z
    .string()
    .describe('The generated code for the application.'),
  progress: z
    .string()
    .describe('A short summary of the code generation progress.'),
});
export type GenerateCodeFromDescriptionOutput = z.infer<
  typeof GenerateCodeFromDescriptionOutputSchema
>;

export async function generateCodeFromDescription(
  input: GenerateCodeFromDescriptionInput
): Promise<GenerateCodeFromDescriptionOutput> {
  return generateCodeFromDescriptionFlow(input);
}

const generateCodePrompt = ai.definePrompt({
  name: 'generateCodePrompt',
  input: {schema: GenerateCodeFromDescriptionInputSchema},
  output: {schema: GenerateCodeFromDescriptionOutputSchema},
  prompt: `You are an AI code generator. You take a description of an application, the desired language/framework, and project name, and output the code required for a basic, runnable version of the application.

  Project Name: {{{projectName}}}
  Language/Framework: {{{languageFramework}}}
  Description: {{{projectDescription}}}

  Please provide the complete code for the application, including all necessary files and dependencies.
  Respond in a single block of text.
`,
});

const generateCodeFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCodeFromDescriptionFlow',
    inputSchema: GenerateCodeFromDescriptionInputSchema,
    outputSchema: GenerateCodeFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateCodePrompt(input);
    //For now, the progress field is hardcoded, but this will be updated in future steps.
    return {generatedCode: output!.generatedCode, progress: 'Generated basic application code.'};
  }
);
