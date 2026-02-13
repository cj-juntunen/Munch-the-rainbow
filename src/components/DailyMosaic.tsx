import { DayLog, MacroCategory } from '../utils/types';
import { CATEGORIES, CATEGORY_MAP } from '../utils/categories';

interface Props {
  dayLog: DayLog;
}

export default function DailyMosaic({ dayLog }: Props) {
  // Count occurrences of each category across all meals
  const counts: Record<MacroCategory, number> = {} as Record<MacroCategory, number>;
  CATEGORIES.forEach((c) => (counts[c.key] = 0));

  dayLog.meals.forEach((meal) => {
    meal.entries.forEach((entry) => {
      entry.categories.forEach((cat) => {
        counts[cat]++;
      });
    });
  });

  const totalEntries = dayLog.meals.reduce(
    (sum, meal) => sum + meal.entries.length,
    0
  );
  const uniqueColors = Object.values(counts).filter((c) => c > 0).length;

  if (totalEntries === 0) {
    return (
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 20,
          padding: '28px 20px',
          border: '1px solid var(--border)',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8, opacity: 0.4 }}>🌈</div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Your mosaic is empty — log your first meal to start painting!
        </p>
      </div>
    );
  }

  // Build mosaic tiles from all entries
  const tiles: { category: MacroCategory; id: string }[] = [];
  dayLog.meals.forEach((meal) => {
    meal.entries.forEach((entry) => {
      entry.categories.forEach((cat) => {
        tiles.push({ category: cat, id: `${entry.id}-${cat}` });
      });
    });
  });

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 20,
        padding: 20,
        border: '1px solid var(--border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <h3
          style={{
            fontFamily: "'Baloo 2', cursive",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Today's Mosaic
        </h3>
        <span
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            fontWeight: 600,
          }}
        >
          {uniqueColors}/{CATEGORIES.length} colors
        </span>
      </div>

      {/* Mosaic grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 16,
        }}
      >
        {tiles.map((tile, i) => {
          const cat = CATEGORY_MAP[tile.category];
          return (
            <div
              key={tile.id}
              className="animate-pop-in"
              title={cat.label}
              style={{
                animationDelay: `${i * 0.03}s`,
                opacity: 0,
                width: 38,
                height: 38,
                borderRadius: 10,
                background: cat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                boxShadow: `0 2px 8px ${cat.color}30`,
                cursor: 'default',
              }}
            >
              {cat.emoji}
            </div>
          );
        })}
      </div>

      {/* Category summary bar */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat) => {
          const count = counts[cat.key];
          const present = count > 0;
          return (
            <div
              key={cat.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 10px',
                borderRadius: 20,
                background: present ? cat.lightColor : 'var(--bg)',
                border: `1.5px solid ${present ? cat.color : 'var(--border)'}`,
                opacity: present ? 1 : 0.35,
                fontSize: 12,
                fontWeight: 600,
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: 14 }}>{cat.emoji}</span>
              {present && <span style={{ color: cat.color }}>{count}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
