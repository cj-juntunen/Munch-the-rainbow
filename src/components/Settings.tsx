import { AppSettings } from '../utils/types';

interface Props {
  settings: AppSettings;
  onUpdate: (partial: Partial<AppSettings>) => void;
  onClose: () => void;
}

export default function Settings({ settings, onUpdate, onClose }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="animate-slide-up"
        style={{
          background: 'var(--bg)',
          borderRadius: 20,
          padding: 24,
          width: '100%',
          maxWidth: 420,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            ⚙️ Settings
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: 'var(--text-muted)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Macro detail toggle */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '16px 18px',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 15 }}>
              Show detailed nutrition data
            </span>
            <button
              onClick={() =>
                onUpdate({ showMacroDetails: !settings.showMacroDetails })
              }
              style={{
                width: 52,
                height: 30,
                borderRadius: 15,
                border: 'none',
                background: settings.showMacroDetails
                  ? 'var(--success)'
                  : 'var(--border)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  left: settings.showMacroDetails ? 25 : 3,
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#FFF',
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                }}
              />
            </button>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            This app is designed to work without numbers. Only enable this if
            tracking grams supports your health goals. When enabled, you'll see
            optional gram fields when logging meals.
          </p>
        </div>

        {/* About */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '16px 18px',
            marginBottom: 16,
          }}
        >
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>
            About Munch the Rainbow
          </p>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            A number-free nutrition tracker that focuses on balance and variety.
            Your data is stored locally on this device and never sent anywhere.
          </p>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginTop: 8,
            }}
          >
            Barcode data powered by{' '}
            <a
              href="https://world.openfoodfacts.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--fats)' }}
            >
              Open Food Facts
            </a>
            .
          </p>
        </div>

        {/* Clear data */}
        <button
          onClick={() => {
            if (
              window.confirm(
                'Are you sure? This will permanently delete all your logged meals.'
              )
            ) {
              localStorage.removeItem('munch-the-rainbow');
              window.location.reload();
            }
          }}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 12,
            border: '2px solid var(--accent)',
            background: 'transparent',
            color: 'var(--accent)',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
}
