'use server';

/**
 * @fileOverview Retrieves nutritional information for a given recipe, including its country of origin, a healthy rating, and approximate macronutrient values.
 *
 * - getNutritionalInformation - A function that retrieves the nutritional information of the recipe.
 * - NutritionalInformationInput - The input type for the getNutritionalInformation function.
 * - NutritionalInformationOutput - The return type for the getNutritionalInformation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NutritionalInformationInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe to get nutritional information for.'),
  ingredients: z.string().describe('A list of ingredients of the recipe.'),
});

export type NutritionalInformationInput = z.infer<typeof NutritionalInformationInputSchema>;

const NutritionalInformationOutputSchema = z.object({
  countryOfOrigin: z.string().describe('The country of origin of the recipe.'),
  healthyRating: z.string().describe('A rating of how healthy the recipe is.'),
  calories: z.number().describe('The approximate number of calories in the recipe.'),
  protein: z.number().describe('The approximate amount of protein in the recipe (grams).'),
  fat: z.number().describe('The approximate amount of fat in the recipe (grams).'),
  carbs: z.number().describe('The approximate amount of carbohydrates in the recipe (grams).'),
});

export type NutritionalInformationOutput = z.infer<typeof NutritionalInformationOutputSchema>;

export async function getNutritionalInformation(
  input: NutritionalInformationInput
): Promise<NutritionalInformationOutput> {
  return getNutritionalInformationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nutritionalInformationPrompt',
  input: {schema: NutritionalInformationInputSchema},
  output: {schema: NutritionalInformationOutputSchema},
  prompt: `You are an expert nutritionist providing detailed nutritional information about recipes.

  Given the recipe name and ingredients, determine the country of origin, provide a healthy rating, and estimate the calories, protein, fat, suger, fiber and carbohydrate content.
  Respond in JSON format.

  Recipe Name: {{{recipeName}}}
  Ingredients: {{{ingredients}}}

  Output the nutritional information as a JSON object with the following keys:
  - countryOfOrigin: The country where the recipe originated.
  - healthyRating: A string describing the healthiness of the recipe (e.g., "Very Healthy", "Moderately Healthy", "Unhealthy").
  - calories: The total estimated calories in the recipe.
  - protein: The estimated grams of protein in the recipe.
  - fat: The estimated grams of fat in the recipe.
  - carbs: The estimated grams of carbohydrates in the recipe.
  `,
});

const getNutritionalInformationFlow = ai.defineFlow(
  {
    name: 'getNutritionalInformationFlow',
    inputSchema: NutritionalInformationInputSchema,
    outputSchema: NutritionalInformationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
