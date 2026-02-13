import { MacroCategory, MacroDetail } from './types';

interface NutrientData {
  proteins_100g?: number;
  carbohydrates_100g?: number;
  fat_100g?: number;
  sugars_100g?: number;
  fiber_100g?: number;
  calcium_100g?: number;
  [key: string]: unknown;
}

interface OpenFoodFactsProduct {
  product_name?: string;
  brands?: string;
  nutriments?: NutrientData;
  categories_tags?: string[];
  image_url?: string;
}

export interface ScannedProduct {
  name: string;
  brand?: string;
  categories: MacroCategory[];
  macroDetails: Partial<Record<MacroCategory, MacroDetail>>;
  imageUrl?: string;
  barcode: string;
}

export function mapProductToCategories(
  product: OpenFoodFactsProduct,
  barcode: string
): ScannedProduct | null {
  if (!product.product_name) return null;

  const n = product.nutriments || {};
  const categories: MacroCategory[] = [];
  const macroDetails: Partial<Record<MacroCategory, MacroDetail>> = {};

  // Protein: > 5g per 100g
  if (n.proteins_100g && n.proteins_100g > 5) {
    categories.push('protein');
    macroDetails.protein = { grams: Math.round(n.proteins_100g) };
  }

  // Carbs: > 15g per 100g
  if (n.carbohydrates_100g && n.carbohydrates_100g > 15) {
    categories.push('carbs');
    macroDetails.carbs = { grams: Math.round(n.carbohydrates_100g) };
  }

  // Fats: > 5g per 100g
  if (n.fat_100g && n.fat_100g > 5) {
    categories.push('fats');
    macroDetails.fats = { grams: Math.round(n.fat_100g) };
  }

  // Dairy detection via category tags
  const catTags = (product.categories_tags || []).join(' ').toLowerCase();
  if (
    catTags.includes('dairy') ||
    catTags.includes('milk') ||
    catTags.includes('cheese') ||
    catTags.includes('yogurt') ||
    (n.calcium_100g && n.calcium_100g > 100)
  ) {
    if (!categories.includes('dairy')) categories.push('dairy');
  }

  // Fruits detection
  if (
    catTags.includes('fruit') ||
    catTags.includes('juice') ||
    catTags.includes('smoothie')
  ) {
    if (!categories.includes('fruits')) categories.push('fruits');
  }

  // Veggies detection
  if (
    catTags.includes('vegetable') ||
    catTags.includes('salad') ||
    catTags.includes('legume')
  ) {
    if (!categories.includes('veggies')) categories.push('veggies');
  }

  // Hydration detection
  if (
    catTags.includes('water') ||
    catTags.includes('tea') ||
    catTags.includes('coffee') ||
    catTags.includes('beverage')
  ) {
    if (!categories.includes('hydration')) categories.push('hydration');
  }

  // Fallback: if nothing matched, assign based on highest macro
  if (categories.length === 0) {
    const protein = n.proteins_100g || 0;
    const carb = n.carbohydrates_100g || 0;
    const fat = n.fat_100g || 0;
    const max = Math.max(protein, carb, fat);
    if (max === protein) categories.push('protein');
    else if (max === carb) categories.push('carbs');
    else categories.push('fats');
  }

  return {
    name: product.product_name,
    brand: product.brands,
    categories,
    macroDetails,
    imageUrl: product.image_url,
    barcode,
  };
}

export async function lookupBarcode(
  barcode: string
): Promise<ScannedProduct | null> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    return mapProductToCategories(data.product, barcode);
  } catch {
    return null;
  }
}
