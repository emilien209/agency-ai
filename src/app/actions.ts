"use server";

import { z } from "zod";
import { signUpSchema } from "./schema";
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
