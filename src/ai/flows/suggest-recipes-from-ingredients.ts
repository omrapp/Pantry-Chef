'use server';

/**
 * @fileOverview Suggest recipes based on a list of ingredients.
 *
 * - suggestRecipesFromIngredients - A function that suggests recipes based on ingredients.
 * - SuggestRecipesFromIngredientsInput - The input type for the suggestRecipesFromIngredients function.
 * - SuggestRecipesFromIngredientsOutput - The return type for the suggestRecipesFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipesFromIngredientsInputSchema = z.object({
  ingredients: z
    .array(z.string())
    .describe('A list of ingredients the user has available.'),
});
export type SuggestRecipesFromIngredientsInput = z.infer<
  typeof SuggestRecipesFromIngredientsInputSchema
>;

const SuggestRecipesFromIngredientsOutputSchema = z.object({
  recipes: z
    .array(
      z.object({
        name: z.string().describe('The name of the recipe.'),
        ingredients: z.string().describe('The list of ingredients required.'),
        instructions: z.array(z.string()).describe('The steps to make the recipe.'),
        countryOfOrigin: z.string().describe('The country of origin of the dish.'),
        healthyRating: z.string().describe('A healthy rating of the dish.'),
        approximateCalories: z.number().describe('The approximate calories in the dish.'),
        proteins: z.number().describe('The approximate protein content in grams.'),
        fat: z.number().describe('The approximate fat content in grams.'),
        carbs: z.number().describe('The approximate carbohydrate content in grams.'),
        photoDataUri: z
          .string()
          .describe(
            "A photo of the recipe, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
          ),
      })
    )
    .describe('A list of suggested recipes.'),
});
export type SuggestRecipesFromIngredientsOutput = z.infer<
  typeof SuggestRecipesFromIngredientsOutputSchema
>;

export async function suggestRecipesFromIngredients(
  input: SuggestRecipesFromIngredientsInput
): Promise<SuggestRecipesFromIngredientsOutput> {
  return suggestRecipesFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipesFromIngredientsPrompt',
  input: {schema: SuggestRecipesFromIngredientsInputSchema},
  output: {schema: SuggestRecipesFromIngredientsOutputSchema},
  prompt: `You are a world-class chef. Given the following ingredients, suggest recipes that the user can make.

Ingredients: {{ingredients}}

For each recipe, provide:
- name
- ingredients
- instructions as an array of strings, with each string being a step in the recipe.
- country of origin
- a healthy rating of the dish
- the approximate calories, proteins, fat, and carbs in the dish
- photoDataUri

Make sure the photoDataUri is a valid data URI.

Return the recipes in JSON format.
`,
});

const suggestRecipesFromIngredientsFlow = ai.defineFlow(
  {
    name: 'suggestRecipesFromIngredientsFlow',
    inputSchema: SuggestRecipesFromIngredientsInputSchema,
    outputSchema: SuggestRecipesFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
