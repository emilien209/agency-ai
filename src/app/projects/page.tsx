"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CodeAILogo } from "@/components/icons";
import { Loader2, PlusCircle } from "lucide-react";

export default function ProjectsDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

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
          <div className="flex flex-1 items-center justify-end">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12 flex-1">
        <div className="mb-8">
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground">Here are the projects you've created.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle>My Sample Project</CardTitle>
                    <CardDescription>A simple to-do list app.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Last updated: 5 minutes ago</p>
                     <Button asChild>
                        <Link href="/project/sample-project">Open Project</Link>
                    </Button>
                </CardContent>
            </Card>
            {/* Future projects will be mapped here */}
        </div>
      </main>
    </div>
  );
}
