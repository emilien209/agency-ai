"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeAILogo } from "@/components/icons";
import { BarChart, Brush, Code, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useAuth, signOut } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "Creative",
    description: "Branding, logo design, conversion optimization. We create a brand identity that stands out and converts.",
    icon: Brush,
  },
  {
    title: "Marketing & Advertising",
    description: "Google/YouTube Ads, Facebook Ads, LinkedIn automation. We drive targeted traffic and generate leads.",
    icon: BarChart,
  },
  {
    title: "Development",
    description: "Web & mobile design, CRM, UX/UI, funnel optimization. We build high-performing digital experiences.",
    icon: Code,
  },
];

const processSteps = [
    {
        step: 1,
        title: "Discovery & Strategy",
        description: "We start by understanding your business, goals, and target audience to create a tailored strategy."
    },
    {
        step: 2,
        title: "Execution & Delivery",
        description: "Our team gets to work, implementing the strategy with precision and delivering high-quality results on time."
    },
    {
        step: 3,
        title: "Analysis & Optimization",
        description: "We continuously monitor performance, analyze data, and optimize our campaigns to maximize your ROI."
    }
]

export default function AgencyLandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const agencyImage = PlaceHolderImages.find(img => img.id === 'agency-image');

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeAILogo className="h-8 w-8" />
            <span className="font-bold sm:inline-block text-lg">
              Agency
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-primary">About</Link>
            <Link href="#services" className="transition-colors hover:text-primary">Services</Link>
            <Link href="#portfolio" className="transition-colors hover:text-primary">Portfolio</Link>
            <Link href="#process" className="transition-colors hover:text-primary">Our Process</Link>
            <Link href="#blog" className="transition-colors hover:text-primary">Blog</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {loading ? null : user ? (
              <>
                <Button onClick={() => router.push("/projects")}>My Projects</Button>
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
              Design, Development & Digital Marketing
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
              We will help you get more business.
            </p>
          </div>
        </section>

        {/* Lead Capture */}
        <section className="py-16 bg-secondary/50">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Get Started Today</h2>
            <p className="text-muted-foreground mt-2 mb-6">Sign up now to get started.</p>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link href="/signup">Create Your Account</Link>
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
              <p className="text-muted-foreground mt-2">What we can do for you.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.title} className="bg-secondary/30 border-secondary/50 transform hover:-translate-y-2 transition-transform duration-300">
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

        {/* Process Section */}
        <section id="process" className="py-24 bg-secondary/20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Our Process</h2>
                    <p className="text-muted-foreground mt-2">3 Easy Steps to Success</p>
                </div>
                <div className="relative grid md:grid-cols-3 gap-8">
                     <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 hidden md:block"></div>
                     {processSteps.map((step) => (
                        <div key={step.step} className="relative z-10 text-center p-6 bg-background rounded-lg border">
                           <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">{step.step}</div>
                           <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                           <p className="text-muted-foreground">{step.description}</p>
                        </div>
                     ))}
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className="py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
                <p className="mt-4 text-muted-foreground">
                  We are a team of passionate experts dedicated to delivering exceptional results. Our data-driven approach and commitment to our clients' success set us apart. We don't just build websites; we build businesses.
                </p>
                 <Button className="mt-6">Learn More</Button>
              </div>
              <div className="relative aspect-square w-full max-w-md mx-auto">
                {agencyImage && (
                    <Image
                        src={agencyImage.imageUrl}
                        alt={agencyImage.description}
                        fill
                        className="object-cover rounded-xl shadow-2xl shadow-primary/20"
                        data-ai-hint={agencyImage.imageHint}
                    />
                )}
              </div>
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
                        <span className="font-bold text-lg">Agency</span>
                    </Link>
                    <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Agency. All rights reserved.</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Navigation</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#about" className="hover:text-primary">About</Link></li>
                        <li><Link href="#services" className="hover:text-primary">Services</Link></li>
                        <li><Link href="#portfolio" className="hover:text-primary">Portfolio</Link></li>
                        <li><Link href="#blog" className="hover:text-primary">Blog</Link></li>
                    </ul>
                </div>
                <div>
                     <h4 className="font-semibold mb-4">Contact</h4>
                     <p className="text-sm text-muted-foreground">contact@agency.com</p>
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
