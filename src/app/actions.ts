"use server";

import {
  generateLandingPageCopy,
  type GenerateLandingPageCopyInput,
  type GenerateLandingPageCopyOutput,
} from "@/ai/flows/generate-landing-page-copy";
import { z } from "zod";

const formSchema = z.object({
  productDescription: z.string().min(10, {
    message: "Product description must be at least 10 characters.",
  }),
  targetAudience: z.string().min(10, {
    message: "Target audience must be at least 10 characters.",
  }),
});

type State = {
  status: "success" | "error" | "idle";
  message?: string;
  data?: GenerateLandingPageCopyOutput;
};

export async function generateCopyAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = formSchema.safeParse({
    productDescription: formData.get("productDescription"),
    targetAudience: formData.get("targetAudience"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const input: GenerateLandingPageCopyInput = {
    productDescription: validatedFields.data.productDescription,
    targetAudience: validatedFields.data.targetAudience,
    numVariations: 3,
  };

  try {
    const result = await generateLandingPageCopy(input);
    if (result && result.variations.length > 0) {
      return {
        status: "success",
        data: result,
      };
    } else {
        return {
            status: "error",
            message: "The AI failed to generate copy. Please try again with a more detailed description."
        }
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
