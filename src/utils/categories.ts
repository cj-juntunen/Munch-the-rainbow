import { MacroCategory, MealType } from './types';

export interface CategoryInfo {
  key: MacroCategory;
  label: string;
  emoji: string;
  color: string;
  lightColor: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    key: 'protein',
    label: 'Protein',
    emoji: '🥩',
    color: 'var(--protein)',
    lightColor: 'var(--protein-light)',
    description: 'Meat, fish, eggs, beans, tofu, nuts',
  },
  {
    key: 'carbs',
    label: 'Carbs',
    emoji: '🍞',
    color: 'var(--carbs)',
    lightColor: 'var(--carbs-light)',
    description: 'Bread, rice, pasta, grains, potatoes',
  },
  {
    key: 'veggies',
    label: 'Veggies',
    emoji: '🥦',
    color: 'var(--veggies)',
    lightColor: 'var(--veggies-light)',
    description: 'All vegetables and greens',
  },
  {
    key: 'fruits',
    label: 'Fruits',
    emoji: '🍊',
    color: 'var(--fruits)',
    lightColor: 'var(--fruits-light)',
    description: 'Fresh, dried, or frozen fruits',
  },
  {
    key: 'fats',
    label: 'Healthy Fats',
    emoji: '🥑',
    color: 'var(--fats)',
    lightColor: 'var(--fats-light)',
    description: 'Avocado, olive oil, nuts, seeds',
  },
  {
    key: 'dairy',
    label: 'Dairy / Calcium',
    emoji: '🧀',
    color: 'var(--dairy)',
    lightColor: 'var(--dairy-light)',
    description: 'Milk, cheese, yogurt, fortified alternatives',
  },
  {
    key: 'hydration',
    label: 'Hydration',
    emoji: '💧',
    color: 'var(--hydration)',
    lightColor: 'var(--hydration-light)',
    description: 'Water, tea, coffee, juice',
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c])
) as Record<MacroCategory, CategoryInfo>;

export interface MealInfo {
  type: MealType;
  label: string;
  emoji: string;
  timeHint: string;
}

export const MEALS: MealInfo[] = [
  { type: 'breakfast', label: 'Breakfast', emoji: '🌅', timeHint: 'Morning' },
  { type: 'lunch', label: 'Lunch', emoji: '☀️', timeHint: 'Midday' },
  { type: 'dinner', label: 'Dinner', emoji: '🌙', timeHint: 'Evening' },
  { type: 'snack', label: 'Snack', emoji: '✨', timeHint: 'Anytime' },
];
