import { useEffect, useState } from 'react';

interface Props {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export default function Toast({ message, onDismiss, duration = 3500 }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onDismiss, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        maxWidth: 'calc(100vw - 48px)',
        width: 400,
      }}
    >
      <div
        className={exiting ? 'animate-toast-out' : 'animate-toast-in'}
        style={{
          background: 'var(--text)',
          color: '#FFF',
          borderRadius: 16,
          padding: '16px 24px',
          fontSize: 15,
          lineHeight: 1.5,
          textAlign: 'center',
          fontWeight: 500,
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        {message}
      </div>
    </div>
  );
}
