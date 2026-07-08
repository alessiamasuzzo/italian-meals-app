// types/meal.ts

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | null; // per strIngredient1..20 e strMeasure1..20
}

export type LoadStatus = "idle" | "loading" | "success" | "error";

export interface MealsListState {
  status: LoadStatus;
  items: MealSummary[];
  message: string;
}

export interface MealDetailState {
  status: LoadStatus;
  meal: MealDetail | null;
  message: string;
}