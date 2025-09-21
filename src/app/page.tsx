"use client";

import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { CodeAILogo } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeGenerationForm } from "@/components/code-generation-form";
import { GenerationProgress } from "@/components/generation-progress";
import { PreviewPanel } from "@/components/preview-panel";
import type { FormSchema } from "./schema";
import { generateProjectAction } from "./actions";

type GenerationStatus = "idle" | "generating" | "testing" | "done" | "error";

type GenerationState = {
  status: GenerationStatus;
  result: string | null;
  projectName: string;
  error: string | null;
};

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [state, setState] = useState<GenerationState>({
    status: "idle",
    result: null,
    projectName: "",
    error: null,
  });

  const handleGenerate = (values: FormSchema) => {
    startTransition(async () => {
      setState({ status: "generating", result: null, projectName: values.projectName, error: null });

      const response = await generateProjectAction(values);

      if (response.success) {
        setState({ status: "done", result: response.data, projectName: values.projectName, error: null });
      } else {
        setState({ status: "error", result: null, projectName: "", error: response.error });
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: response.error || "An unknown error occurred.",
        });
      }
    });
  };

  const handleReset = () => {
    setState({ status: "idle", result: null, projectName: "", error: null });
  };

  const renderContent = () => {
    switch (state.status) {
      case "idle":
      case "error":
        return <CodeGenerationForm onSubmit={handleGenerate} isPending={isPending} />;
      case "generating":
      case "testing":
        return <GenerationProgress status={state.status} />;
      case "done":
        return state.result ? (
          <PreviewPanel code={state.result} projectName={state.projectName} onReset={handleReset} />
        ) : (
          <p>Something went wrong. Please try again.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 border-b">
        <div className="container mx-auto flex items-center gap-2">
           <CodeAILogo className="h-8 w-8" />
          <h1 className="text-xl font-bold tracking-tight">CodeAI</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight font-headline">
              From Idea to Code, Instantly
            </h2>
            <p className="text-lg text-muted-foreground">
              Pick your stack, describe your project, and let our AI generate a
              complete, working application ready for you to download and run.
            </p>
          </div>
           <Card className="row-start-2 lg:row-start-1 lg:col-start-2">
             <CardHeader>
                <CardTitle className="text-2xl">
                    {state.status === 'idle' || state.status === 'error' ? 'Create Your Project' : 'Generation in Progress'}
                </CardTitle>
                <CardDescription>
                  {state.status === 'idle' || state.status === 'error' ? 'Fill in the details below to get started.' : 'Watch the magic happen!'}
                </CardDescription>
             </CardHeader>
            <CardContent>
                {renderContent()}
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CodeAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
