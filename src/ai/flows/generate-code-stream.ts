'use server';
/**
 * @fileOverview A streaming code generation AI agent that writes code based on a description.
 *
 * - generateCodeStream - A function that handles the streaming code generation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generateCodeFromDescriptionFlow } from './generate-code-from-description';

const GenerateCodeInputSchema = z.object({
  description: z.string().describe('The description of the app to generate.'),
  features: z.array(z.string()).optional().describe('The features to include in the generated code.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

export async function generateCodeStream(input: GenerateCodeInput) {
  const { stream } = ai.generateStream({
    prompt: `You are a code generation AI.
Generate code for an application based on the following description:

Description:
${input.description}

Selected Features:
${(input.features ?? []).join('\n- ')}

Framework:
Next.js

Please generate the complete, self-contained code for the main component of the application.
`,
    model: 'googleai/gemini-2.5-flash',
  });

  let content = '';
  const chunks: string[] = [];
  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) {
      content += text;
      chunks.push(text);
    }
  }
  return chunks;
}
