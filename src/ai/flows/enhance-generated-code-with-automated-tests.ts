'use server';
/**
 * @fileOverview This flow enhances generated code with automated tests.
 *
 * - enhanceGeneratedCodeWithAutomatedTests - A function that enhances the generated code with automated tests.
 * - EnhanceGeneratedCodeWithAutomatedTestsInput - The input type for the enhanceGeneratedCodeWithAutomatedTests function.
 * - EnhanceGeneratedCodeWithAutomatedTestsOutput - The return type for the enhanceGeneratedCodeWithAutomatedTests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceGeneratedCodeWithAutomatedTestsInputSchema = z.object({
  projectDescription: z.string().describe('The description of the project.'),
  generatedCode: z.string().describe('The generated code for the project.'),
  language: z.string().describe('The programming language of the generated code.'),
  framework: z.string().describe('The framework used for the generated code.'),
});
export type EnhanceGeneratedCodeWithAutomatedTestsInput = z.infer<typeof EnhanceGeneratedCodeWithAutomatedTestsInputSchema>;

const EnhanceGeneratedCodeWithAutomatedTestsOutputSchema = z.object({
  enhancedCodeWithTests: z.string().describe('The enhanced code with automated tests.'),
});
export type EnhanceGeneratedCodeWithAutomatedTestsOutput = z.infer<typeof EnhanceGeneratedCodeWithAutomatedTestsOutputSchema>;

export async function enhanceGeneratedCodeWithAutomatedTests(
  input: EnhanceGeneratedCodeWithAutomatedTestsInput
): Promise<EnhanceGeneratedCodeWithAutomatedTestsOutput> {
  return enhanceGeneratedCodeWithAutomatedTestsFlow(input);
}

const enhanceGeneratedCodeWithAutomatedTestsPrompt = ai.definePrompt({
  name: 'enhanceGeneratedCodeWithAutomatedTestsPrompt',
  input: {schema: EnhanceGeneratedCodeWithAutomatedTestsInputSchema},
  output: {schema: EnhanceGeneratedCodeWithAutomatedTestsOutputSchema},
  prompt: `You are an AI code generator that specializes in adding automated tests to existing code.

  Given the following project description, generated code, language, and framework, enhance the generated code with automated tests.

  Project Description: {{{projectDescription}}}
  Generated Code: {{{generatedCode}}}
  Language: {{{language}}}
  Framework: {{{framework}}}

  Make sure the tests are appropriate for the language and framework being used.

  Return the enhanced code with automated tests.
  `,
});

const enhanceGeneratedCodeWithAutomatedTestsFlow = ai.defineFlow(
  {
    name: 'enhanceGeneratedCodeWithAutomatedTestsFlow',
    inputSchema: EnhanceGeneratedCodeWithAutomatedTestsInputSchema,
    outputSchema: EnhanceGeneratedCodeWithAutomatedTestsOutputSchema,
  },
  async input => {
    const {output} = await enhanceGeneratedCodeWithAutomatedTestsPrompt(input);
    return output!;
  }
);
