"use client";

import { useState } from "react";
import { IngredientInput } from "@/components/pantry-chef/ingredient-input";
import { RecipeList } from "@/components/pantry-chef/recipe-list";
import { useToast } from "@/hooks/use-toast";
import type { Recipe } from "@/lib/types";
import { getRecipes } from "./actions";
import { RecipeSkeleton } from "@/components/pantry-chef/recipe-skeleton";
import { ChefHat } from "lucide-react";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (ingredients: string[]) => {
    if (ingredients.length === 0) {
      toast({
        variant: "destructive",
        title: "No ingredients",
        description: "Please add some ingredients to find recipes.",
      });
      return;
    }
    setIsLoading(true);
    setRecipes([]);
    try {
      const result = await getRecipes({ ingredients });
      if (result && result.recipes) {
        setRecipes(result.recipes);
      } else {
        toast({
          variant: "destructive",
          title: "No recipes found",
          description: "Could not find any recipes with these ingredients. Try different ones.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "There was an error finding recipes. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasSearched = recipes.length > 0;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
            Pantry Chef
          </h1>
          <p className="text-muted-foreground text-lg">
            What's in your pantry? Let's cook something delicious!
          </p>
        </header>

        <IngredientInput onSearch={handleSearch} isLoading={isLoading} />

        <div className="mt-8">
          {isLoading && <RecipeSkeleton />}
          {!isLoading && hasSearched && <RecipeList recipes={recipes} />}
          {!isLoading && !hasSearched && (
            <div className="text-center text-muted-foreground py-16 px-4 border-2 border-dashed border-border rounded-lg flex flex-col items-center gap-4">
              <ChefHat className="w-16 h-16 text-primary" />
              <h2 className="text-xl font-semibold">
                Your culinary adventure awaits
              </h2>
              <p>
                Enter the ingredients you have on hand, and we'll suggest
                delicious recipes for you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
