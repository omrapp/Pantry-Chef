"use client";

import { RecipeList } from "@/components/pantry-chef/recipe-list";
import { useFavorites } from "@/hooks/use-favorites";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
            Favorite Recipes
          </h1>
          <p className="text-muted-foreground text-lg">
            Your collection of saved culinary delights.
          </p>
        </header>

        {isLoaded && favorites.length > 0 && <RecipeList recipes={favorites} />}
        
        {isLoaded && favorites.length === 0 && (
          <div className="text-center text-muted-foreground py-16 px-4 border-2 border-dashed border-border rounded-lg flex flex-col items-center gap-4">
            <Heart className="w-16 h-16 text-primary" />
            <h2 className="text-xl font-semibold">
              Your cookbook is empty
            </h2>
            <p>
              Find recipes you love and click the heart icon to save them here for later.
            </p>
          </div>
        )}
        
        {!isLoaded && (
           <div className="text-center text-muted-foreground py-16">
             <p>Loading your favorite recipes...</p>
           </div>
        )}
      </div>
    </div>
  );
}
