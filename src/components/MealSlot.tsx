import { MealSlot as MealSlotType, MealType, FoodEntry } from '../utils/types';
import { CATEGORY_MAP, MEALS } from '../utils/categories';

interface Props {
  meal: MealSlotType;
  showMacroDetails: boolean;
  onAddClick: (mealType: MealType) => void;
  onRemoveEntry: (mealType: MealType, entryId: string) => void;
}

export default function MealSlot({
  meal,
  showMacroDetails,
  onAddClick,
  onRemoveEntry,
}: Props) {
  const mealInfo = MEALS.find((m) => m.type === meal.type)!;

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 20,
        padding: '18px 18px 14px',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: meal.entries.length > 0 ? 12 : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{mealInfo.emoji}</span>
          <div>
            <h4
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {mealInfo.label}
            </h4>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {mealInfo.timeHint}
            </span>
          </div>
        </div>
        <button
          onClick={() => onAddClick(meal.type)}
          style={{
            background: 'var(--bg)',
            border: '2px dashed var(--border)',
            borderRadius: 12,
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            color: 'var(--text-muted)',
            fontFamily: "'Nunito', sans-serif",
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--text)';
            e.currentTarget.style.color = 'var(--text)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          + Add
        </button>
      </div>

      {/* Entries */}
      {meal.entries.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {meal.entries.map((entry, idx) => (
            <EntryRow
              key={entry.id}
              entry={entry}
              showMacroDetails={showMacroDetails}
              onRemove={() => onRemoveEntry(meal.type, entry.id)}
              delay={idx * 0.05}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EntryRow({
  entry,
  showMacroDetails,
  onRemove,
  delay,
}: {
  entry: FoodEntry;
  showMacroDetails: boolean;
  onRemove: () => void;
  delay: number;
}) {
  return (
    <div
      className="animate-pop-in"
      style={{
        animationDelay: `${delay}s`,
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        background: 'var(--bg)',
        borderRadius: 14,
      }}
    >
      {/* Color dots */}
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {entry.categories.map((cat) => (
          <span
            key={cat}
            title={CATEGORY_MAP[cat].label}
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: CATEGORY_MAP[cat].color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
            }}
          >
            {CATEGORY_MAP[cat].emoji}
          </span>
        ))}
      </div>

      {/* Name + optional macros */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {entry.name}
        </div>
        {showMacroDetails && entry.macroDetails && (
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              display: 'flex',
              gap: 8,
              marginTop: 2,
            }}
          >
            {Object.entries(entry.macroDetails).map(([key, detail]) => (
              <span key={key}>
                {CATEGORY_MAP[key as keyof typeof CATEGORY_MAP]?.emoji}{' '}
                {detail?.grams}g
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          fontSize: 16,
          cursor: 'pointer',
          color: 'var(--text-muted)',
          padding: '4px 4px',
          flexShrink: 0,
          opacity: 0.5,
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
        title="Remove entry"
      >
        ✕
      </button>
    </div>
  );
}
