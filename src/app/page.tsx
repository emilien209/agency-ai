"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import { useAuth, signInWithGoogle, signOut } from "@/hooks/use-auth";

import { generateProjectAction } from "./actions";
import { CodeGenerationForm } from "@/components/code-generation-form";
import type { FormSchema } from "./schema";
import { GenerationProgress } from "@/components/generation-progress";
import { PreviewPanel } from "@/components/preview-panel";
import { CodeAILogo } from "@/components/icons";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [generationStatus, setGenerationStatus] = useState<"idle" | "generating" | "testing" | "done" | "error">("idle");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  
  const { user, loading: authLoading } = useAuth();

  const onSubmit = (values: FormSchema) => {
    setProjectName(values.projectName);
    setGenerationStatus("generating");
    startTransition(async () => {
      // Simulate progress
      setTimeout(() => setGenerationStatus("testing"), 2000); 

      const result = await generateProjectAction(values, user?.uid);

      if (result.success) {
        setGeneratedCode(result.data);
        setGenerationStatus("done");
      } else {
        setGenerationStatus("error");
        // Optionally, display the error message to the user
        console.error(result.error);
      }
    });
  };
  
  const handleReset = () => {
    setGenerationStatus("idle");
    setGeneratedCode(null);
    setProjectName("");
  };

  const renderContent = () => {
    if (generationStatus !== "idle" && generationStatus !== 'done') {
      return <GenerationProgress status={generationStatus} />;
    }
    if (generationStatus === "done" && generatedCode) {
      return <PreviewPanel code={generatedCode} projectName={projectName} onReset={handleReset} />;
    }
    return (
      <div className="mx-auto max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            AI Code Generator
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Describe your project, and let our AI handle the rest. From idea to
            code in minutes.
          </p>
        </div>
        <CodeGenerationForm onSubmit={onSubmit} isPending={isPending} />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeAILogo className="h-8 w-8" />
            <span className="font-bold sm:inline-block">
              CodeAI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
             {user && !authLoading && (
              <Link
                href="/projects"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                My Projects
              </Link>
            )}
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
             {authLoading ? (
                <Button variant="outline" disabled>Loading...</Button>
            ) : user ? (
                <Button onClick={signOut} variant="outline">Sign Out</Button>
            ) : (
                <Button onClick={signInWithGoogle}>Sign In</Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container relative py-12 md:py-24 lg:py-32">
          {renderContent()}
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-8">
        <div className="container flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} CodeAI. All rights reserved.
            </p>
             <div className="flex items-center gap-2">
              <CodeAILogo className="h-6 w-6" />
              <span className="font-semibold">CodeAI</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
