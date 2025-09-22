"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeAILogo } from "@/components/icons";
import { BarChart, Brush, Code, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { useAuth, signOut } from "@/hooks/use-auth";

const services = [
  {
    title: "AI-Powered Generation",
    description: "Describe your application in natural language, and let our AI generate the complete codebase for you.",
    icon: Brush,
  },
  {
    title: "Multi-Framework Support",
    description: "Generate projects for popular stacks like Next.js, React, Vue, and more. We handle the boilerplate.",
    icon: BarChart,
  },
  {
    title: "Download & Deploy",
    description: "Export your generated code as a ZIP file or deploy it directly to platforms like Vercel and Netlify.",
    icon: Code,
  },
];

export default function AgencyLandingPage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeAILogo className="h-8 w-8" />
            <span className="font-bold sm:inline-block text-lg">
              CodeAI
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#services" className="transition-colors hover:text-primary">Features</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {loading ? null : user ? (
              <>
                <Button variant="ghost" asChild>
                    <Link href="/projects">My Projects</Link>
                </Button>
                <Button variant="ghost" onClick={signOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
           <Image
            src="https://i.pinimg.com/736x/39/d0/88/39d08818d27d7e1136e2f30c2bf5416b.jpg"
            alt="Abstract background image"
            fill
            className="absolute z-0 w-full h-full object-cover"
          />
          <div className="absolute z-10 w-full h-full bg-black/50"></div>
          <div className="container relative z-20">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Build & Deploy Apps with AI
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
              Describe your idea. Let AI generate the code. Download or deploy in one click.
            </p>
          </div>
        </section>

        {/* Lead Capture */}
        <section className="py-16 bg-secondary/50">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Get Started in Seconds</h2>
            <p className="text-muted-foreground mt-2 mb-6">Create an account to start building your first AI-generated application.</p>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link href="/signup">Create Your Account</Link>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Core Features</h2>
              <p className="text-muted-foreground mt-2">Everything you need to go from idea to deployment.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.title} className="bg-card transform hover:-translate-y-2 transition-transform duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/20 text-primary">
                        <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-secondary/20">
        <div className="container">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <CodeAILogo className="h-8 w-8" />
                        <span className="font-bold text-lg">CodeAI</span>
                    </Link>
                    <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} CodeAI. All rights reserved.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Navigation</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#services" className="hover:text-primary">Features</Link></li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold mb-4">Contact</h4>
                     <p className="text-sm text-muted-foreground">contact@codeai.dev</p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4 text-muted-foreground">
                        <Link href="#" className="hover:text-primary"><Twitter /></Link>
                        <Link href="#" className="hover:text-primary"><Facebook /></Link>
                        <Link href="#" className="hover:text-primary"><Linkedin /></Link>
                        <Link href="#" className="hover:text-primary"><Youtube /></Link>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
