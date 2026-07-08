// types/meal.ts

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export type LoadStatus = "idle" | "loading" | "success" | "error";

export interface MealsListState {
  status: LoadStatus;
  items: MealSummary[];
  message: string;
}