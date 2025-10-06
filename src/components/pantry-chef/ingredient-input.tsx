"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, X, Loader2 } from "lucide-react";

type IngredientInputProps = {
  onSearch: (ingredients: string[]) => void;
  isLoading: boolean;
};

const popularIngredients = [
  "rice",
  "pasta",
  "garlic",
  "onion",
  "chicken",
  "beef",
  "tomatoes",
  "cheese",
  "potatoes",
  "carrots",
];

export function IngredientInput({ onSearch, isLoading }: IngredientInputProps) {
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleAddIngredient = (ingredient: string) => {
    if (ingredient.trim() && !ingredients.includes(ingredient.trim())) {
      setIngredients((prev) => [...prev, ingredient.trim()]);
    }
  };
  
  const handleAddCurrentIngredient = () => {
    handleAddIngredient(currentIngredient);
    setCurrentIngredient("");
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredientToRemove));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCurrentIngredient();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(ingredients);
  };

  const availableSuggestions = popularIngredients.filter(
    (popIngredient) => !ingredients.includes(popIngredient)
  );

  return (
    <div className="w-full space-y-4 rounded-lg border bg-card p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="e.g., chicken, tomatoes, rice"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            type="button"
            onClick={handleAddCurrentIngredient}
            disabled={isLoading || !currentIngredient.trim()}
            variant="secondary"
          >
            <Plus />
            Add
          </Button>
        </div>

        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge key={ingredient} variant="secondary" className="pl-3 pr-1 py-1 text-sm">
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="ml-1 rounded-full p-0.5 hover:bg-background/50"
                  aria-label={`Remove ${ingredient}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {availableSuggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Or add a popular ingredient:</p>
            <div className="flex flex-wrap gap-2">
              {availableSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleAddIngredient(suggestion)}
                  disabled={isLoading}
                  className="text-sm border rounded-full px-3 py-1 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || ingredients.length === 0}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search />
          )}
          Find Recipes
        </Button>
      </form>
    </div>
  );
}
