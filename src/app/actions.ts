"use server";

import { generateCodeFromDescription } from "@/ai/flows/generate-code-from-description";
import { enhanceGeneratedCodeWithAutomatedTests } from "@/ai/flows/enhance-generated-code-with-automated-tests";
import type { FormSchema } from "./schema";

export async function generateProjectAction(values: FormSchema) {
  try {
    const featuresText =
      values.features && values.features.length > 0
        ? ` It should include the following features: ${values.features.join(
            ", "
          )}.`
        : "";
    const fullDescription = `${values.projectDescription}${featuresText}`;

    // Step 1: Generate initial code
    const initialCodeResponse = await generateCodeFromDescription({
      projectName: values.projectName,
      projectDescription: fullDescription,
      languageFramework: values.languageFramework,
    });

    if (!initialCodeResponse || !initialCodeResponse.generatedCode) {
      throw new Error("Initial code generation failed.");
    }

    // Step 2: Enhance with tests
    const [language, framework] = values.languageFramework.split("/");
    const testedCodeResponse = await enhanceGeneratedCodeWithAutomatedTests({
      projectDescription: fullDescription,
      generatedCode: initialCodeResponse.generatedCode,
      language: language,
      framework: framework || language, // Fallback for single-name entries like 'Go'
    });
    
    if (!testedCodeResponse || !testedCodeResponse.enhancedCodeWithTests) {
      throw new Error("Code enhancement with tests failed.");
    }

    return { success: true, data: testedCodeResponse.enhancedCodeWithTests };
  } catch (error) {
    console.error("Code Generation Pipeline Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      error: `Failed to generate project. ${errorMessage}`,
    };
  }
}
