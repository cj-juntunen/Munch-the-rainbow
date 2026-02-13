import { useState, useCallback } from 'react';
import { DayLog, MealSlot, FoodEntry, AppSettings, MealType } from '../utils/types';

const STORAGE_KEY = 'munch-the-rainbow';
const SETTINGS_KEY = 'munch-the-rainbow-settings';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function createEmptyDay(date: string): DayLog {
  return {
    date,
    meals: [
      { type: 'breakfast', entries: [] },
      { type: 'lunch', entries: [] },
      { type: 'dinner', entries: [] },
      { type: 'snack', entries: [] },
    ],
  };
}

function loadAllLogs(): Record<string, DayLog> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllLogs(logs: Record<string, DayLog>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function useStorage() {
  const [allLogs, setAllLogs] = useState<Record<string, DayLog>>(loadAllLogs);

  const getDayLog = useCallback(
    (date?: string): DayLog => {
      const d = date || getToday();
      return allLogs[d] || createEmptyDay(d);
    },
    [allLogs]
  );

  const addEntry = useCallback(
    (mealType: MealType, entry: FoodEntry, date?: string) => {
      const d = date || getToday();
      setAllLogs((prev) => {
        const dayLog = prev[d] || createEmptyDay(d);
        const updatedMeals: MealSlot[] = dayLog.meals.map((meal) =>
          meal.type === mealType
            ? { ...meal, entries: [...meal.entries, entry] }
            : meal
        );
        const updated = { ...prev, [d]: { ...dayLog, meals: updatedMeals } };
        saveAllLogs(updated);
        return updated;
      });
    },
    []
  );

  const removeEntry = useCallback(
    (mealType: MealType, entryId: string, date?: string) => {
      const d = date || getToday();
      setAllLogs((prev) => {
        const dayLog = prev[d];
        if (!dayLog) return prev;
        const updatedMeals: MealSlot[] = dayLog.meals.map((meal) =>
          meal.type === mealType
            ? { ...meal, entries: meal.entries.filter((e) => e.id !== entryId) }
            : meal
        );
        const updated = { ...prev, [d]: { ...dayLog, meals: updatedMeals } };
        saveAllLogs(updated);
        return updated;
      });
    },
    []
  );

  const getWeekLogs = useCallback((): DayLog[] => {
    const logs: DayLog[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      logs.push(allLogs[key] || createEmptyDay(key));
    }
    return logs;
  }, [allLogs]);

  return { getDayLog, addEntry, removeEntry, getWeekLogs, getToday };
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw
        ? JSON.parse(raw)
        : { showMacroDetails: false, hasCompletedOnboarding: false };
    } catch {
      return { showMacroDetails: false, hasCompletedOnboarding: false };
    }
  });

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { settings, updateSettings };
}
