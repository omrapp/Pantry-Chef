"use client";

import { useState, useEffect, useCallback } from "react";
import type { Recipe } from "@/lib/types";

const FAVORITES_KEY = "pantry-chef-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  const saveFavorites = (newFavorites: Recipe[]) => {
    try {
      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback((recipe: Recipe) => {
    saveFavorites([...favorites, recipe]);
  }, [favorites]);

  const removeFavorite = useCallback((recipeName: string) => {
    const newFavorites = favorites.filter((fav) => fav.name !== recipeName);
    saveFavorites(newFavorites);
  }, [favorites]);

  const isFavorite = useCallback((recipeName: string) => {
    return favorites.some((fav) => fav.name === recipeName);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
