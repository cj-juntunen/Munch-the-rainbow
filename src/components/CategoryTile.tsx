import { CategoryInfo } from '../utils/categories';

interface Props {
  category: CategoryInfo;
  selected: boolean;
  onToggle: () => void;
  count?: number;
}

export default function CategoryTile({
  category,
  selected,
  onToggle,
  count,
}: Props) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: selected ? category.color : category.lightColor,
        color: selected ? '#FFF' : category.color,
        border: `2px solid ${category.color}`,
        borderRadius: 16,
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: selected ? 'scale(1.05)' : 'scale(1)',
        boxShadow: selected
          ? `0 4px 16px ${category.color}40`
          : '0 1px 4px rgba(0,0,0,0.04)',
        position: 'relative',
        minWidth: 0,
        flex: '1 1 0',
      }}
    >
      <span style={{ fontSize: 26 }}>{category.emoji}</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          fontFamily: "'Baloo 2', cursive",
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
        }}
      >
        {category.label}
      </span>
      {count !== undefined && count > 0 && (
        <span
          className="animate-pop-in"
          style={{
            position: 'absolute',
            top: -6,
            right: -6,
            background: 'var(--accent)',
            color: '#FFF',
            borderRadius: '50%',
            width: 22,
            height: 22,
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(255,107,107,0.4)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
