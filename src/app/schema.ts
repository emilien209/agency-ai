import { z } from "zod";

export const formSchema = z.object({
  projectName: z
    .string()
    .min(2, "Project name must be at least 2 characters."),
  languageFramework: z
    .string({
      required_error: "Please select a language/framework.",
    })
    .min(1, "Please select a language/framework."),
  projectDescription: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description must be 500 characters or less."),
  features: z.array(z.string()).optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
