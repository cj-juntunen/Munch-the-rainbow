import { useState, useCallback } from 'react';
import { MacroCategory, FoodEntry, MealType } from '../utils/types';
import { CATEGORIES, CATEGORY_MAP } from '../utils/categories';
import { ScannedProduct } from '../utils/macroMapper';
import CategoryTile from './CategoryTile';
import BarcodeScanner from './BarcodeScanner';

interface Props {
  mealType: MealType;
  showMacroDetails: boolean;
  onAdd: (entry: FoodEntry) => void;
  onClose: () => void;
}

export default function AddFoodModal({
  mealType,
  showMacroDetails,
  onAdd,
  onClose,
}: Props) {
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<
    MacroCategory[]
  >([]);
  const [macroInputs, setMacroInputs] = useState<
    Partial<Record<MacroCategory, string>>
  >({});
  const [showScanner, setShowScanner] = useState(false);
  const [scannedInfo, setScannedInfo] = useState<ScannedProduct | null>(null);

  const toggleCategory = (key: MacroCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleProductFound = useCallback((product: ScannedProduct) => {
    setShowScanner(false);
    setScannedInfo(product);
    setName(
      product.brand
        ? `${product.brand} ${product.name}`
        : product.name
    );
    setSelectedCategories(product.categories);

    const inputs: Partial<Record<MacroCategory, string>> = {};
    for (const [key, detail] of Object.entries(product.macroDetails)) {
      if (detail?.grams) {
        inputs[key as MacroCategory] = String(detail.grams);
      }
    }
    setMacroInputs(inputs);
  }, []);

  const handleSubmit = () => {
    if (selectedCategories.length === 0) return;

    const entry: FoodEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim() || selectedCategories.map((c) => CATEGORY_MAP[c].label).join(' + '),
      categories: selectedCategories,
      timestamp: Date.now(),
      barcode: scannedInfo?.barcode,
    };

    if (showMacroDetails) {
      const details: FoodEntry['macroDetails'] = {};
      for (const cat of selectedCategories) {
        const val = macroInputs[cat];
        if (val && !isNaN(Number(val))) {
          details[cat] = { grams: Number(val) };
        }
      }
      if (Object.keys(details).length > 0) {
        entry.macroDetails = details;
      }
    }

    onAdd(entry);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="animate-slide-up"
          style={{
            background: 'var(--bg)',
            borderRadius: '24px 24px 0 0',
            padding: '24px 20px 32px',
            width: '100%',
            maxWidth: 500,
            maxHeight: '90dvh',
            overflow: 'auto',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
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

          {/* Name input + scan button */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input
              type="text"
              placeholder="What are you eating? (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 14,
                border: '2px solid var(--border)',
                fontSize: 15,
                fontFamily: "'Nunito', sans-serif",
                background: 'var(--bg-card)',
                outline: 'none',
              }}
            />
            <button
              onClick={() => setShowScanner(true)}
              style={{
                padding: '12px 16px',
                borderRadius: 14,
                border: '2px solid var(--border)',
                background: 'var(--bg-card)',
                fontSize: 20,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Scan barcode"
            >
              📷
            </button>
          </div>

          {/* Scanned product info */}
          {scannedInfo && (
            <div
              className="animate-pop-in"
              style={{
                background: 'var(--veggies-light)',
                border: '1px solid var(--veggies)',
                borderRadius: 12,
                padding: '10px 14px',
                marginBottom: 16,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 18 }}>✅</span>
              <span>
                Found: <strong>{scannedInfo.name}</strong>
                {scannedInfo.brand && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    {' '}
                    by {scannedInfo.brand}
                  </span>
                )}
                . Categories auto-selected below.
              </span>
            </div>
          )}

          {/* Category tiles */}
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              marginBottom: 10,
              fontWeight: 600,
            }}
          >
            Tap the colors in this meal:
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              marginBottom: 8,
            }}
          >
            {CATEGORIES.slice(0, 4).map((cat) => (
              <CategoryTile
                key={cat.key}
                category={cat}
                selected={selectedCategories.includes(cat.key)}
                onToggle={() => toggleCategory(cat.key)}
              />
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              marginBottom: 20,
            }}
          >
            {CATEGORIES.slice(4).map((cat) => (
              <CategoryTile
                key={cat.key}
                category={cat}
                selected={selectedCategories.includes(cat.key)}
                onToggle={() => toggleCategory(cat.key)}
              />
            ))}
          </div>

          {/* Optional macro details */}
          {showMacroDetails && selectedCategories.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                Grams per macro (optional):
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {selectedCategories.map((catKey) => {
                  const cat = CATEGORY_MAP[catKey];
                  return (
                    <div
                      key={catKey}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 18,
                          width: 28,
                          textAlign: 'center',
                        }}
                      >
                        {cat.emoji}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          width: 90,
                          color: cat.color,
                        }}
                      >
                        {cat.label}
                      </span>
                      <input
                        type="number"
                        inputMode="decimal"
                        placeholder="g"
                        value={macroInputs[catKey] || ''}
                        onChange={(e) =>
                          setMacroInputs((prev) => ({
                            ...prev,
                            [catKey]: e.target.value,
                          }))
                        }
                        style={{
                          width: 80,
                          padding: '8px 12px',
                          borderRadius: 10,
                          border: `2px solid ${cat.color}40`,
                          fontSize: 14,
                          fontFamily: "'Nunito', sans-serif",
                          background: cat.lightColor,
                          outline: 'none',
                          textAlign: 'center',
                        }}
                      />
                      <span
                        style={{ fontSize: 12, color: 'var(--text-muted)' }}
                      >
                        g
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={selectedCategories.length === 0}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 16,
              border: 'none',
              background:
                selectedCategories.length > 0
                  ? 'var(--text)'
                  : 'var(--border)',
              color:
                selectedCategories.length > 0
                  ? '#FFF'
                  : 'var(--text-muted)',
              fontSize: 17,
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 700,
              cursor:
                selectedCategories.length > 0 ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {selectedCategories.length > 0
              ? `Log ${selectedCategories.map((c) => CATEGORY_MAP[c].emoji).join('')}`
              : 'Select at least one category'}
          </button>
        </div>
      </div>

      {showScanner && (
        <BarcodeScanner
          onProductFound={handleProductFound}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
}
