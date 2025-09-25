
'use server';
/**
 * @fileOverview A streaming code generation AI agent that writes code based on a description.
 *
 * - generateCodeStream - A function that handles the streaming code generation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCodeInputSchema = z.object({
  description: z.string().describe('The description of the app to generate.'),
  features: z.array(z.string()).optional().describe('The features to include in the generated code.'),
  framework: z.string().optional().describe('The framework to use for the generated code.'),
});
export type GenerateCodeInput = z.infer<typeof GenerateCodeInputSchema>;

export async function generateCodeStream(input: GenerateCodeInput) {
  const { stream } = ai.generateStream({
    prompt: `You are an expert code generation AI.
Your sole purpose is to generate clean, complete, and self-contained code based on the user's request.
Generate a full project structure based on the user request.
For each file, format the output strictly as follows:
\`\`\`[language] // [filepath]
[code]
...
\`\`\`

Example:
\`\`\`tsx // app/page.tsx
import React from 'react';

export default function Page() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

Do not add any conversational text, explanations, or markdown formatting around the code blocks.
Only output the raw code blocks in the specified format.

Generate code for an application based on the following description:

${input.description}

Framework:
${input.framework ?? 'Next.js'}

Selected Features:
${(input.features ?? []).join('\n- ')}

Please generate the complete project structure and code.
`,
    model: 'googleai/gemini-2.5-flash',
  });

  const chunks: string[] = [];
  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) {
      chunks.push(text);
    }
  }
  return chunks;
}

    