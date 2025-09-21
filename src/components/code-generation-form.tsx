"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Bot, Database, Lock, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { FormSchema } from "@/app/schema";
import { formSchema } from "@/app/schema";

const languages = [
  { value: "javascript/react", label: "JavaScript / React" },
  { value: "python/flask", label: "Python / Flask" },
  { value: "java/spring", label: "Java / Spring" },
  { value: "go", label: "Go" },
  { value: "flutter", label: "Flutter" },
];

const features = [
  { id: "login", label: "Login / Authentication", icon: Lock },
  { id: "database", label: "Database Integration", icon: Database },
  { id: "fileupload", label: "File Upload", icon: Upload },
];

type CodeGenerationFormProps = {
  onSubmit: (values: FormSchema) => void;
  isPending: boolean;
};

export function CodeGenerationForm({ onSubmit, isPending }: CodeGenerationFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      features: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., My Awesome App" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="languageFramework"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language / Framework</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language or framework" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your project, e.g., 'a simple todo list with login'"
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Features</FormLabel>
                <FormDescription>
                  Select additional features for your project.
                </FormDescription>
              </div>
              <div className="space-y-3">
                {features.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 has-[[data-state=checked]]:bg-secondary"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                             <item.icon className="h-4 w-4 text-muted-foreground" /> {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
        >
          {isPending ? (
            <Bot className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          {isPending ? "Generating..." : "Generate Project"}
        </Button>
      </form>
    </Form>
  );
}
