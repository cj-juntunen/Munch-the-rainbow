import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { lookupBarcode, ScannedProduct } from '../utils/macroMapper';
import { CATEGORY_MAP } from '../utils/categories';

interface Props {
  onProductFound: (product: ScannedProduct) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onProductFound, onClose }: Props) {
  const [mode, setMode] = useState<'camera' | 'manual'>('camera');
  const [manualCode, setManualCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLookup = useCallback(
    async (barcode: string) => {
      setLoading(true);
      setError(null);
      try {
        const product = await lookupBarcode(barcode.trim());
        if (product) {
          onProductFound(product);
        } else {
          setError(
            `No product found for barcode ${barcode}. Try entering it manually.`
          );
        }
      } catch {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [onProductFound]
  );

  useEffect(() => {
    if (mode !== 'camera' || cameraError) return;

    let scanner: Html5Qrcode | null = null;
    let mounted = true;

    const startCamera = async () => {
      try {
        scanner = new Html5Qrcode('barcode-reader');
        scannerRef.current = scanner;
        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 280, height: 160 },
          },
          (decodedText) => {
            if (mounted && scanner) {
              scanner.stop().catch(() => {});
              handleLookup(decodedText);
            }
          },
          () => {}
        );
      } catch {
        if (mounted) {
          setCameraError(true);
          setMode('manual');
        }
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (scanner) {
        scanner.stop().catch(() => {});
      }
    };
  }, [mode, cameraError, handleLookup]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 100,
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
          maxHeight: '85dvh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            📷 Scan Barcode
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: 4,
            }}
          >
            ✕
          </button>
        </div>

        {/* Mode toggle */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 16,
          }}
        >
          {(['camera', 'manual'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                if (m === 'camera' && cameraError) return;
                setMode(m);
                setError(null);
              }}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 12,
                border: '2px solid var(--border)',
                background: mode === m ? 'var(--text)' : 'var(--bg-card)',
                color: mode === m ? '#FFF' : 'var(--text)',
                fontWeight: 600,
                fontSize: 14,
                cursor: m === 'camera' && cameraError ? 'not-allowed' : 'pointer',
                opacity: m === 'camera' && cameraError ? 0.4 : 1,
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              {m === 'camera' ? '📸 Camera' : '⌨️ Manual'}
            </button>
          ))}
        </div>

        {mode === 'camera' && !cameraError && (
          <div
            ref={containerRef}
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              marginBottom: 16,
              background: '#000',
              minHeight: 200,
            }}
          >
            <div id="barcode-reader" />
          </div>
        )}

        {mode === 'manual' && (
          <div style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                marginBottom: 12,
              }}
            >
              Enter the barcode number found beneath the barcode lines on the
              packaging.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 0012000001086"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && manualCode.trim()) {
                    handleLookup(manualCode);
                  }
                }}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 12,
                  border: '2px solid var(--border)',
                  fontSize: 16,
                  fontFamily: "'Nunito', sans-serif",
                  background: 'var(--bg-card)',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => manualCode.trim() && handleLookup(manualCode)}
                disabled={loading || !manualCode.trim()}
                style={{
                  padding: '12px 20px',
                  borderRadius: 12,
                  border: 'none',
                  background: 'var(--text)',
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading || !manualCode.trim() ? 0.5 : 1,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {loading ? '...' : 'Look up'}
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: 20,
              color: 'var(--text-muted)',
            }}
          >
            <div
              className="animate-float"
              style={{ fontSize: 32, marginBottom: 8 }}
            >
              🔍
            </div>
            Searching Open Food Facts...
          </div>
        )}

        {error && (
          <div
            style={{
              background: '#FFF0F0',
              border: '1px solid #FFCDD2',
              borderRadius: 12,
              padding: '12px 16px',
              fontSize: 14,
              color: '#C62828',
              marginBottom: 8,
            }}
          >
            {error}
          </div>
        )}

        {cameraError && mode === 'camera' && (
          <div
            style={{
              background: 'var(--carbs-light)',
              border: '1px solid var(--carbs)',
              borderRadius: 12,
              padding: '12px 16px',
              fontSize: 14,
              color: 'var(--text)',
              marginBottom: 8,
            }}
          >
            Camera access isn't available. Switch to manual entry to type in a
            barcode number.
          </div>
        )}
      </div>
    </div>
  );
}
