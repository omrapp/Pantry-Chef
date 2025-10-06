"use server";

import {
  suggestRecipesFromIngredients,
  type SuggestRecipesFromIngredientsInput,
  type SuggestRecipesFromIngredientsOutput,
} from "@/ai/flows/suggest-recipes-from-ingredients";

export async function getRecipes(
  input: SuggestRecipesFromIngredientsInput
): Promise<SuggestRecipesFromIngredientsOutput> {
  try {
    const recipes = await suggestRecipesFromIngredients(input);
    return recipes;
  } catch (error) {
    console.error("Error getting recipes:", error);
    throw new Error("Failed to fetch recipes from AI.");
  }
}
