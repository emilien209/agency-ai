"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Zap, Target } from 'lucide-react';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function SearchTeamLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 4L27.6 15.2L38.8 18.8L27.6 22.4L24 33.6L20.4 22.4L9.2 18.8L20.4 15.2L24 4Z" fill="url(#paint0_linear_1_2)" />
      <path d="M4 18.8H14.8" stroke="url(#paint1_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.2 18.8H44" stroke="url(#paint2_linear_1_2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="24" y1="4" x2="24" y2="33.6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="paint1_linear_1_2" x1="4" y1="19.3" x2="14.8" y2="19.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="paint2_linear_1_2" x1="33.2" y1="19.3" x2="44" y2="19.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}


export default function Home() {
  const agencyImage = PlaceHolderImages.find(img => img.id === 'agency-image');

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 mix-blend-screen opacity-50 z-0"></div>
      
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <SearchTeamLogo className="h-8 w-8" />
              <span className="text-xl font-bold">Search Team</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
                About
              </Link>
              <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
                Services
              </Link>
              <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
                Portfolio
              </Link>
              <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
                Our Process
              </Link>
              <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>
                Blog
              </Link>
            </nav>
            <Button className="hidden md:inline-flex bg-gradient-to-r from-primary to-accent text-primary-foreground">Contact</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Design, Development &<br /> Digital Marketing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We will help you get more business
          </p>
        </section>

        <section className="container mx-auto px-4 pb-20 md:pb-32">
          <Card className="max-w-3xl mx-auto p-6 md:p-8 bg-secondary/50 border-primary/50 shadow-lg shadow-primary/20">
            <CardHeader className="text-center">
              <CardDescription>We are going to create a result driven optimal marketing strategy for your business</CardDescription>
              <CardTitle className="text-2xl md:text-3xl font-bold">Free 30 minute Digital Marketing Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col md:flex-row items-center gap-4">
                <Input type="text" placeholder="First Name" className="bg-background/80 h-12" />
                <Input type="email" placeholder="Email" className="bg-background/80 h-12" />
                <Button type="submit" className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  Request a Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
        
        <section className="container mx-auto px-4 pb-20 md:pb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Services include</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-secondary/50 border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-accent">Creative</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Branding/logo design</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Conversion optimization</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Marketing video creation</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/50 border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-accent">Marketing & Advertising</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Google/Youtube Ads</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Facebook Ads</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Linkedin in ads & automation</li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className="bg-secondary/50 border-primary/30">
                    <CardHeader>
                        <CardTitle className="text-accent">Development</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Web design and development</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Mobile design and development</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> CRM and funnel set up</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> UX/UI Design</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Funnel Creation & Optimization</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section className="container mx-auto px-4 pb-20 md:pb-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 text-3xl font-bold text-primary bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center">01</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Schedule your complimentary Marketing Strategy Session</h3>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 text-3xl font-bold text-primary bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center">02</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Get your Free marketing Strategy plan</h3>
                        </div>
                    </div>
                    <div className="flex items-start gap-6">
                        <div className="flex-shrink-0 text-3xl font-bold text-primary bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center">03</div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Work with us to grow your business and get more customers</h3>
                        </div>
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">3 Easy steps to grow your business with ABN Strategies</h2>
                </div>
            </div>
        </section>

        <section className="container mx-auto px-4 pb-20 md:pb-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ABN Agency</h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>Take your business to the next level by working with seasoned digital marketing specialists, to create, implement and optimize your digital marketing strategy.</p>
                        <p>Because we truly want to provide results we are selective in the clients we take on.</p>
                        <p>If we decide to work together we will use our superstar team of developers, data analysts, conversion optimization specialists and media buyers to GROW your business to new heights.</p>
                    </div>
                    <Button className="mt-8 bg-gradient-to-r from-primary to-accent text-primary-foreground">Learn More About Us</Button>
                </div>
                <div className="relative h-64 md:h-auto md:aspect-square">
                {agencyImage && (
                    <Image
                        src={agencyImage.imageUrl}
                        alt={agencyImage.description}
                        fill
                        className="object-contain"
                        data-ai-hint={agencyImage.imageHint}
                    />
                )}
                </div>
            </div>
        </section>

      </main>

      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <SearchTeamLogo className="h-8 w-8" />
                    <span className="text-xl font-bold">Search Team</span>
                </div>
                <nav className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>About</Link>
                    <Link href="#" className="hovertext-primary transition-colors" prefetch={false}>Services</Link>
                    <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>Portfolio</Link>
                    <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>Our Process</Link>
                    <Link href="#" className="hover:text-primary transition-colors" prefetch={false}>Blog</Link>
                </nav>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <Link href="#" aria-label="Facebook"><Zap className="h-5 w-5 hover:text-primary" /></Link>
                    <Link href="#" aria-label="Twitter"><Target className="h-5 w-5 hover:text-primary" /></Link>
                    <Link href="#" aria-label="Instagram"><CheckCircle className="h-5 w-5 hover:text-primary" /></Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
