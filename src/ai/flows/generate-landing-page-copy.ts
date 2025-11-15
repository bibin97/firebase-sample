'use server';

/**
 * @fileOverview Generates landing page copy variations for A/B testing.
 *
 * - generateLandingPageCopy - A function that generates landing page copy variations.
 * - GenerateLandingPageCopyInput - The input type for the generateLandingPageCopy function.
 * - GenerateLandingPageCopyOutput - The return type for the generateLandingPageCopy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingPageCopyInputSchema = z.object({
  productDescription: z
    .string()
    .describe('A brief description of the product or service.'),
  targetAudience: z
    .string()
    .describe('Description of the target audience for the landing page.'),
  numVariations: z
    .number()
    .default(3)
    .describe('The number of landing page copy variations to generate.'),
});
export type GenerateLandingPageCopyInput = z.infer<
  typeof GenerateLandingPageCopyInputSchema
>;

const LandingPageCopyVariationSchema = z.object({
  headline: z.string().describe('The headline for the landing page.'),
  description: z.string().describe('The main description for the landing page.'),
  callToAction: z.string().describe('The call to action for the landing page.'),
});

const GenerateLandingPageCopyOutputSchema = z.object({
  variations: z.array(LandingPageCopyVariationSchema).describe('The generated landing page copy variations.'),
});
export type GenerateLandingPageCopyOutput = z.infer<
  typeof GenerateLandingPageCopyOutputSchema
>;

export async function generateLandingPageCopy(
  input: GenerateLandingPageCopyInput
): Promise<GenerateLandingPageCopyOutput> {
  return generateLandingPageCopyFlow(input);
}

const generateLandingPageCopyPrompt = ai.definePrompt({
  name: 'generateLandingPageCopyPrompt',
  input: {schema: GenerateLandingPageCopyInputSchema},
  output: {schema: GenerateLandingPageCopyOutputSchema},
  prompt: `You are an expert copywriter specializing in high-converting landing pages.

  Generate {{numVariations}} different versions of landing page copy (headline, description, call to action) based on the product description and target audience provided.

  Product Description: {{{productDescription}}}
  Target Audience: {{{targetAudience}}}

  Each variation should be unique and optimized to appeal to the target audience. The call to action should be concise and encourage immediate action.

  Please provide the variations in the following JSON format:
  {
    "variations": [
      {
        "headline": "[Headline 1]",
        "description": "[Description 1]",
        "callToAction": "[Call to Action 1]"
      },
      {
        "headline": "[Headline 2]",
        "description": "[Description 2]",
        "callToAction": "[Call to Action 2]"
      },
      {
        "headline": "[Headline 3]",
        "description": "[Description 3]",
        "callToAction": "[Call to Action 3]"
      }
    ]
  }`,
});

const generateLandingPageCopyFlow = ai.defineFlow(
  {
    name: 'generateLandingPageCopyFlow',
    inputSchema: GenerateLandingPageCopyInputSchema,
    outputSchema: GenerateLandingPageCopyOutputSchema,
  },
  async input => {
    const {output} = await generateLandingPageCopyPrompt(input);
    return output!;
  }
);
