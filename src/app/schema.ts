import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  features: z.array(z.string()).optional(),
  framework: z.string().min(1, {
    message: "Framework is required.",
  }),
});
