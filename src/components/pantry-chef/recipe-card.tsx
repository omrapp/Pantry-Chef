"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Globe } from "lucide-react";
import type { Recipe } from "@/lib/types";
import { useFavorites } from "@/hooks/use-favorites";
import { RecipeDetails } from "./recipe-details";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();

  const favorite = isLoaded && isFavorite(recipe.name);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening the sheet
    if (favorite) {
      removeFavorite(recipe.name);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Sheet>
      <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <SheetTrigger asChild>
            <div className="cursor-pointer">
              <div className="relative aspect-video w-full">
                <Image
                  src={recipe.photoDataUri}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </SheetTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-background/70 hover:bg-background z-10"
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-5 h-5 text-primary ${
                favorite ? "fill-primary" : ""
              }`}
            />
          </Button>
        </div>
        <SheetTrigger asChild>
          <div className="flex flex-col flex-grow cursor-pointer">
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-lg font-headline leading-tight">
                {recipe.name}
              </CardTitle>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{recipe.countryOfOrigin}</span>
              </div>
            </CardFooter>
          </div>
        </SheetTrigger>
      </Card>
      <RecipeDetails recipe={recipe} />
    </Sheet>
  );
}
