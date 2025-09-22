"use server";

import { z } from "zod";
import { generateCodeFromDescriptionFlow } from "@/ai/flows/generate-code-from-description";
import { suggestFeaturesFromDescriptionFlow } from "@/ai/flows/suggest-features-from-description";
import { generateCodeStream } from "@/ai/flows/generate-code-stream";
import { formSchema, signUpSchema } from "./schema";
import { auth, db } from "@/lib/firebase-admin";

export async function signUp(values: z.infer<typeof signUpSchema>) {
  if (!auth || !db) {
    return { success: false, error: "Firebase Admin not initialized." };
  }
  try {
    const userRecord = await auth.createUser({
      email: values.email,
      password: values.password,
      displayName: values.fullName,
    });

    // Optionally, save additional user data to Firestore
    await db.collection("users").doc(userRecord.uid).set({
      fullName: values.fullName,
      email: values.email,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function suggestFeatures(values: z.infer<typeof formSchema>) {
  const result = await suggestFeaturesFromDescriptionFlow(values);
  return result;
}

export async function generateCode(values: z.infer<typeof formSchema>) {
  const result = await generateCodeFromDescriptionFlow(values);
  return result;
}

export async function generateCodeStreaming(values: z.infer<typeof formSchema>) {
  return generateCodeStream(values);
}
