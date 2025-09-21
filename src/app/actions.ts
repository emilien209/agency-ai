"use server";

import { z } from "zod";
import { generateCodeFromDescriptionFlow } from "@/ai/flows/generate-code-from-description";
import { suggestFeaturesFromDescriptionFlow } from "@/ai/flows/suggest-features-from-description";
import { formSchema, signUpSchema } from "./schema";
import { auth } from "@/lib/firebase-admin";
import { getFirestore } from "firebase-admin/firestore";


export async function signUp(values: z.infer<typeof signUpSchema>) {
  try {
    const userRecord = await auth.createUser({
      email: values.email,
      password: values.password,
      displayName: values.fullName,
    });

    // Optionally, save additional user data to Firestore
    const db = getFirestore();
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
