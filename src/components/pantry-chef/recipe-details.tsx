"use client";

import Image from "next/image";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Recipe } from "@/lib/types";
import { Flame, Droplets, Wheat, Beef, HeartPulse } from "lucide-react";
import { Button } from "../ui/button";
import { useFavorites } from "@/hooks/use-favorites";

type RecipeDetailsProps = {
  recipe: Recipe;
};

export function RecipeDetails({ recipe }: RecipeDetailsProps) {
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();
  const favorite = isLoaded && isFavorite(recipe.name);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(recipe.name);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <SheetContent className="sm:max-w-2xl w-full p-0">
      <ScrollArea className="h-full">
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src={recipe.photoDataUri}
            alt={recipe.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 space-y-6">
          <SheetHeader className="text-left space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">{recipe.countryOfOrigin}</Badge>
                <SheetTitle className="text-3xl font-headline">{recipe.name}</SheetTitle>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full flex-shrink-0 ml-4"
                onClick={handleFavoriteClick}
              >
                <HeartPulse
                  className={`w-5 h-5 text-primary transition-colors ${favorite ? "fill-primary" : ""}`}
                />
              </Button>
            </div>
            <SheetDescription>
              {recipe.healthyRating}
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <Flame className="w-6 h-6 text-primary mb-1" />
              <span className="font-bold text-lg">{recipe.approximateCalories}</span>
              <span className="text-xs text-muted-foreground">Calories</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <Beef className="w-6 h-6 text-primary mb-1" />
              <span className="font-bold text-lg">{recipe.proteins}g</span>
              <span className="text-xs text-muted-foreground">Protein</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <Droplets className="w-6 h-6 text-primary mb-1" />
              <span className="font-bold text-lg">{recipe.fat}g</span>
              <span className="text-xs text-muted-foreground">Fat</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/50">
              <Wheat className="w-6 h-6 text-primary mb-1" />
              <span className="font-bold text-lg">{recipe.carbs}g</span>
              <span className="text-xs text-muted-foreground">Carbs</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-headline">Ingredients</h3>
            <p className="whitespace-pre-line text-sm text-muted-foreground">{recipe.ingredients}</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold font-headline">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="pl-2">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </ScrollArea>
    </SheetContent>
  );
}
