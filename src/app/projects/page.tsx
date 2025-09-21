"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { getProjectsForUser, Project } from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeAILogo } from "@/components/icons";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/');
      return;
    }

    const fetchProjects = async () => {
      setLoading(true);
      const userProjects = await getProjectsForUser(user.uid);
      setProjects(userProjects);
      setLoading(false);
    };

    fetchProjects();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
        <div className="container mx-auto p-4 lg:p-8">
            <h2 className="text-3xl font-bold mb-6">My Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6 mt-2" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="p-4 border-b">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CodeAILogo className="h-8 w-8" />
            <h1 className="text-xl font-bold tracking-tight">CodeAI</h1>
          </Link>
          <Link href="/">
            <Button variant="outline">Create New Project</Button>
          </Link>
        </div>
      </header>
       <main className="flex-grow container mx-auto p-4 lg:p-8">
            <h2 className="text-3xl font-bold mb-6 tracking-tight">My Projects</h2>
            {projects.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold">No Projects Yet</h3>
                    <p className="text-muted-foreground mt-2 mb-4">You haven't generated any projects. Let's create one!</p>
                    <Link href="/">
                        <Button>Generate Your First Project</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id}>
                    <CardHeader>
                        <CardTitle>{project.projectName}</CardTitle>
                        <CardDescription>
                            {project.languageFramework} - Created on {format(new Date(project.createdAt.toString()), 'PPP')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{project.projectDescription}</p>
                    </CardContent>
                    </Card>
                ))}
                </div>
            )}
       </main>
      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CodeAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
