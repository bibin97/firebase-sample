'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateCopyAction } from '@/app/actions';

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Loader2, Wand2 } from 'lucide-react';
import { useEffect } from 'react';

const formSchema = z.object({
  productDescription: z.string().min(20, {
    message: 'Product description must be at least 20 characters.',
  }).max(500, {
    message: 'Product description must not be longer than 500 characters.'
  }),
  targetAudience: z.string().min(10, {
    message: 'Target audience must be at least 10 characters.',
  }).max(300, {
    message: 'Target audience must not be longer than 300 characters.'
  }),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Copy
        </>
      )}
    </Button>
  );
}

export default function AIGeneratorPage() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(generateCopyAction, {
    status: 'idle',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDescription: '',
      targetAudience: '',
    },
  });

  useEffect(() => {
    if (state.status === 'error' && state.message) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: typeof state.message === 'string' ? state.message : 'Please check the form for errors.',
      });
    }
  }, [state, toast]);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">AI-Powered Copy Generator</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Describe your product and target audience, and let our AI generate compelling landing page copy for you to A/B test.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Generator Inputs</CardTitle>
              <CardDescription>
                Provide details for the AI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form action={formAction} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., An online platform that uses gamification to teach coding to kids aged 8-12."
                            className="resize-none"
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Parents looking for engaging educational activities for their children."
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <SubmitButton />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4 font-headline">Generated Variations</h2>
          <div className="space-y-6">
            {state.status === 'success' && state.data ? (
              state.data.variations.map((variation, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-muted/50 p-4">
                    <CardTitle className="flex justify-between items-center text-lg">
                      <span>Variation #{index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(
                        `Headline: ${variation.headline}\nDescription: ${variation.description}\nCTA: ${variation.callToAction}`
                      )}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Headline</h3>
                      <p className="font-serif text-xl">{variation.headline}</p>
                    </div>
                     <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Description</h3>
                      <p>{variation.description}</p>
                    </div>
                     <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-1">Call to Action</h3>
                      <p className="font-bold text-primary">{variation.callToAction}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/50 p-4">
                     <Button className="w-full" onClick={() => toast({ title: `Variation ${index + 1} selected for A/B test!`})}>
                      Use this for A/B Test
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
                 <Wand2 className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <CardTitle>Your copy will appear here</CardTitle>
                <CardDescription className="mt-2 max-w-xs">
                  Fill out the form on the left and click "Generate Copy" to see the magic happen.
                </CardDescription>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
