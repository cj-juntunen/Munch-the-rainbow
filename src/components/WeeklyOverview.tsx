import { DayLog, MacroCategory } from '../utils/types';
import { CATEGORIES, CATEGORY_MAP } from '../utils/categories';

interface Props {
  weekLogs: DayLog[];
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeeklyOverview({ weekLogs }: Props) {
  const today = new Date().toISOString().split('T')[0];

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
      <h3
        style={{
          fontFamily: "'Baloo 2', cursive",
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 14,
        }}
      >
        This Week
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 6,
        }}
      >
        {weekLogs.map((log, i) => {
          const d = new Date(log.date + 'T12:00:00');
          const dayLabel = DAY_LABELS[d.getDay() === 0 ? 6 : d.getDay() - 1] ||
            d.toLocaleDateString('en', { weekday: 'short' });
          const isToday = log.date === today;

          // Gather all categories present this day
          const cats = new Set<MacroCategory>();
          log.meals.forEach((meal) => {
            meal.entries.forEach((entry) => {
              entry.categories.forEach((c) => cats.add(c));
            });
          });

          const catArray = CATEGORIES.filter((c) => cats.has(c.key));
          const empty = catArray.length === 0;

          return (
            <div
              key={log.date}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: isToday ? 800 : 500,
                  color: isToday ? 'var(--text)' : 'var(--text-muted)',
                }}
              >
                {dayLabel}
              </span>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: 12,
                  background: empty ? 'var(--bg)' : 'var(--bg-card)',
                  border: isToday
                    ? '2px solid var(--text)'
                    : '1.5px solid var(--border)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignContent: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  padding: 3,
                  opacity: empty ? 0.4 : 1,
                  transition: 'all 0.3s',
                }}
              >
                {empty ? (
                  <span style={{ fontSize: 12, opacity: 0.5 }}>·</span>
                ) : (
                  catArray.map((cat) => (
                    <div
                      key={cat.key}
                      style={{
                        width: catArray.length <= 4 ? 12 : 8,
                        height: catArray.length <= 4 ? 12 : 8,
                        borderRadius: '50%',
                        background: cat.color,
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
