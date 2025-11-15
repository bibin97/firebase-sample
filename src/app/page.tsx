import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { ArrowRight, Check, Rocket, Zap, BrainCircuit } from 'lucide-react';

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === 'hero');
  const testimonials = placeholderImages.filter((img) =>
    img.id.startsWith('testimonial-')
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container px-4 md:px-6 space-y-6">
            <h1 className="text-4xl font-headline font-extrabold tracking-tight md:text-6xl lg:text-7xl animate-fade-in-up">
              Unlock Your Potential with MashMagic
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/90 animate-fade-in-up animation-delay-300">
              The revolutionary ed-tech platform that personalizes learning and
              makes education magical.
            </p>
            <div className="animate-fade-in-up animation-delay-600">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <section id="features" className="w-full py-20 md:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                  Key Features
                </div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why MashMagic is Different
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is designed from the ground up to provide an
                  engaging, effective, and fun learning experience for
                  everyone.
                </p>
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">
                      <Rocket className="mr-4 text-primary" /> Personalized Learning Paths
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground pl-10">
                      MashMagic uses AI to adapt to your learning style, creating a unique educational journey just for you.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">
                       <Zap className="mr-4 text-primary" /> Interactive Content
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground pl-10">
                      Dive into our rich library of interactive lessons, quizzes, and simulations that make learning active, not passive.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">
                       <BrainCircuit className="mr-4 text-primary" /> AI-Powered Insights
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground pl-10">
                      Get real-time feedback and detailed progress reports to understand your strengths and areas for improvement.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="w-full max-w-md mx-auto">
                 <Image
                    src="https://picsum.photos/seed/features/600/600"
                    alt="Feature illustration"
                    width={600}
                    height={600}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint="education technology abstract"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="testimonials" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                Testimonials
              </div>
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Loved by Students & Educators
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our community is saying about their MashMagic experience.
              </p>
            </div>
            <Carousel
              opts={{ align: 'start', loop: true }}
              className="w-full max-w-5xl mx-auto mt-12"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full">
                        <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage
                              src={testimonial.imageUrl}
                              alt={testimonial.description}
                              data-ai-hint={testimonial.imageHint}
                            />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <p className="text-muted-foreground italic">
                            {testimonial.description}
                          </p>
                          <div className="font-semibold">
                            {index === 0 && 'Sarah J., Student'}
                            {index === 1 && 'Mark R., Teacher'}
                            {index === 2 && 'Emily W., Parent'}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Pricing and Plans */}
        <section id="pricing" className="w-full py-20 md:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                Pricing
              </div>
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Find the Perfect Plan
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that fits your needs and start your magical learning adventure today.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>For individual learners</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">
                    $10<span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Access to all courses</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Basic progress tracking</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Community support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Choose Basic</Button>
                </CardFooter>
              </Card>
              <Card className="border-primary shadow-lg scale-105">
                 <CardHeader>
                  <div className="flex justify-between items-center">
                     <CardTitle>Pro</CardTitle>
                     <div className="text-xs font-semibold bg-accent text-accent-foreground px-2 py-1 rounded-full">Most Popular</div>
                  </div>
                  <CardDescription>For serious learners</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">
                    $25<span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Everything in Basic</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Personalized learning paths</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> AI-powered insights</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Priority support</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose Pro</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Teams</CardTitle>
                  <CardDescription>For schools and organizations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">
                    Contact Us
                  </div>
                   <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Everything in Pro</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Team dashboard</li>
                    <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Bulk licensing</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="contact" className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline">Stay Updated</CardTitle>
                <CardDescription>
                  Join our mailing list for the latest news, updates, and special offers from MashMagic.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col sm:flex-row gap-4">
                  <Input type="email" placeholder="Enter your email address" className="flex-1" />
                  <Button type="submit">Subscribe</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
