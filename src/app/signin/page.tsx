"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInSchema } from "@/app/schema";
import { CodeAILogo } from "@/components/icons";
import { emailSignIn, signInWithGitHub, signInWithGoogle } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import { Github, Milestone } from "lucide-react";

export default function SignInPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    try {
      const user = await emailSignIn(values.email, values.password);
      if (user) {
        toast({
          title: "Success",
          description: "You've successfully signed in.",
        });
        router.push("/projects");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/projects");
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }
  
  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      router.push("/projects");
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="absolute top-4 left-4">
            <Link href="/" className="flex items-center space-x-2">
                <CodeAILogo className="h-8 w-8" />
                <span className="font-bold text-lg">CodeAI</span>
            </Link>
        </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Choose your preferred sign-in method.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                 <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
                    <Milestone className="mr-2 h-4 w-4" />
                    Sign in with Google
                </Button>
                <Button onClick={handleGitHubSignIn} variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Sign in with GitHub
                </Button>
            </div>

            <Separator className="my-6" />
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Sign In with Email</Button>
            </form>
          </Form>
           <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
