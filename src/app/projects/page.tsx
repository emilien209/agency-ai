"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { suggestFeatures, generateCodeStreaming } from "@/app/actions";
import { formSchema } from "@/app/schema";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CodeAILogo } from "@/components/icons";
import { Github, Loader2 } from "lucide-react";

export default function ProjectsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [suggestedFeatures, setSuggestedFeatures] = useState<string[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [loadingFeatures, setLoadingFeatures] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      features: [],
    },
  });

  async function onSuggestFeatures(values: z.infer<typeof formSchema>) {
    setLoadingFeatures(true);
    setSuggestedFeatures([]);
    try {
      const result = await suggestFeatures(values);
      if (result && result.features) {
        setSuggestedFeatures(result.features);
        form.setValue("features", result.features);
      }
    } catch (error) {
      console.error("Error suggesting features:", error);
    } finally {
      setLoadingFeatures(false);
    }
  }
  
  async function onGenerateCode(values: z.infer<typeof formSchema>) {
    setLoadingCode(true);
    setGeneratedCode("");
    try {
      const stream = await generateCodeStreaming(values);
      for await (const chunk of stream) {
        setGeneratedCode(prev => prev + chunk);
      }
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoadingCode(false);
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push("/signin");
    return null;
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeAILogo className="h-8 w-8" />
            <span className="font-bold sm:inline-block text-lg">
              CodeAI
            </span>
          </Link>
        </div>
      </header>

      <main className="container py-12 flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Create a new project</CardTitle>
            <CardDescription>Describe your application and let AI generate the code for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe your application</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A simple to-do list app with a clean interface."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="button" onClick={form.handleSubmit(onSuggestFeatures)} disabled={loadingFeatures}>
                  {loadingFeatures && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Suggest Features
                </Button>

                {suggestedFeatures.length > 0 && (
                  <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Suggested Features</FormLabel>
                          <FormDescription>
                            Select the features you want to include in your application.
                          </FormDescription>
                        </div>
                        {suggestedFeatures.map((feature) => (
                           <FormField
                            key={feature}
                            control={form.control}
                            name="features"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), feature])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== feature
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {feature}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Button type="button" onClick={form.handleSubmit(onGenerateCode)} disabled={loadingCode}>
                   {loadingCode && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Code
                </Button>
              </form>
            </Form>

            {(generatedCode || loadingCode) && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Generated Code</h3>
                <div className="relative">
                  <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-sm min-h-[100px]">
                    <code>{generatedCode}</code>
                  </pre>
                  <Button variant="secondary" size="icon" className="absolute top-2 right-2">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
