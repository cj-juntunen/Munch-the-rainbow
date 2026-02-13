export type MacroCategory =
  | 'protein'
  | 'carbs'
  | 'veggies'
  | 'fruits'
  | 'fats'
  | 'dairy'
  | 'hydration';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MacroDetail {
  grams?: number;
  calories?: number;
}

export interface FoodEntry {
  id: string;
  name: string;
  categories: MacroCategory[];
  macroDetails?: Partial<Record<MacroCategory, MacroDetail>>;
  barcode?: string;
  timestamp: number;
}

export interface MealSlot {
  type: MealType;
  entries: FoodEntry[];
}

export interface DayLog {
  date: string; // YYYY-MM-DD
  meals: MealSlot[];
}

export interface AppSettings {
  showMacroDetails: boolean;
  hasCompletedOnboarding: boolean;
}
