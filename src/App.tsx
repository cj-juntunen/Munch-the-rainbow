import { useState, useCallback } from 'react';
import { MealType, FoodEntry } from './utils/types';
import { useStorage, useSettings } from './hooks/useStorage';
import { getRandomQuote } from './utils/quotes';
import Onboarding from './components/Onboarding';
import DailyMosaic from './components/DailyMosaic';
import MealSlot from './components/MealSlot';
import WeeklyOverview from './components/WeeklyOverview';
import AddFoodModal from './components/AddFoodModal';
import Settings from './components/Settings';
import Toast from './components/Toast';

export default function App() {
  const { getDayLog, addEntry, removeEntry, getWeekLogs, getToday } =
    useStorage();
  const { settings, updateSettings } = useSettings();

  const [activeMeal, setActiveMeal] = useState<MealType | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const todayLog = getDayLog();
  const weekLogs = getWeekLogs();

  const handleAddEntry = useCallback(
    (entry: FoodEntry) => {
      if (!activeMeal) return;
      addEntry(activeMeal, entry);
      setActiveMeal(null);
      setToast(getRandomQuote());
    },
    [activeMeal, addEntry]
  );

  const handleRemoveEntry = useCallback(
    (mealType: MealType, entryId: string) => {
      removeEntry(mealType, entryId);
    },
    [removeEntry]
  );

  // Onboarding
  if (!settings.hasCompletedOnboarding) {
    return (
      <Onboarding
        onComplete={() => updateSettings({ hasCompletedOnboarding: true })}
      />
    );
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      style={{
        minHeight: '100dvh',
        maxWidth: 500,
        margin: '0 auto',
        padding: '0 16px 100px',
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '20px 0 8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            className="rainbow-text"
            style={{
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Munch the Rainbow
          </h1>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              marginTop: 2,
            }}
          >
            {dateStr}
          </p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            width: 42,
            height: 42,
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ⚙️
        </button>
      </header>

      {/* Daily Mosaic */}
      <section style={{ marginTop: 16 }}>
        <DailyMosaic dayLog={todayLog} />
      </section>

      {/* Meal Slots */}
      <section
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {todayLog.meals.map((meal) => (
          <MealSlot
            key={meal.type}
            meal={meal}
            showMacroDetails={settings.showMacroDetails}
            onAddClick={setActiveMeal}
            onRemoveEntry={handleRemoveEntry}
          />
        ))}
      </section>

      {/* Weekly Overview */}
      <section style={{ marginTop: 20 }}>
        <WeeklyOverview weekLogs={weekLogs} />
      </section>

      {/* Modals */}
      {activeMeal && (
        <AddFoodModal
          mealType={activeMeal}
          showMacroDetails={settings.showMacroDetails}
          onAdd={handleAddEntry}
          onClose={() => setActiveMeal(null)}
        />
      )}

      {showSettings && (
        <Settings
          settings={settings}
          onUpdate={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {toast && (
        <Toast message={toast} onDismiss={() => setToast(null)} />
      )}
    </div>
  );
}
