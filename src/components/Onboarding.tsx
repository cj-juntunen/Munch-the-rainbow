import { CATEGORIES } from '../utils/categories';

interface Props {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: Props) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          maxWidth: 440,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{ fontSize: 64, marginBottom: 8 }}
          className="animate-float"
        >
          🌈
        </div>
        <h1
          className="rainbow-text"
          style={{
            fontSize: 36,
            fontWeight: 800,
            marginBottom: 8,
          }}
        >
          Munch the Rainbow
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 16,
            lineHeight: 1.6,
            marginBottom: 32,
            maxWidth: 360,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Track the <em>colors</em> of your nutrition, not the numbers.
          <br />
          Your goal is simple: eat a variety of colors every day.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.key}
              className="animate-pop-in"
              style={{
                animationDelay: `${i * 0.07}s`,
                opacity: 0,
                background: cat.lightColor,
                border: `2px solid ${cat.color}`,
                borderRadius: 16,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: 20 }}>{cat.emoji}</span>
              {cat.label}
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 32,
            textAlign: 'left',
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
            How it works
          </p>
          <p style={{ marginBottom: 8 }}>
            Log what you eat by tapping macro categories — or scan a barcode and
            let the app figure it out. At the end of the day, check your mosaic:
            more colors = more balance.
          </p>
          <p>
            No calorie counts. No judgment. Just a gentle, colorful picture of
            how you nourished yourself today.
          </p>
        </div>

        <button
          onClick={onComplete}
          style={{
            background: 'var(--text)',
            color: 'var(--bg)',
            border: 'none',
            borderRadius: 14,
            padding: '16px 48px',
            fontSize: 17,
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.15s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'translateY(-2px)')
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
        >
          Let's munch! 🍎
        </button>
      </div>
    </div>
  );
}
