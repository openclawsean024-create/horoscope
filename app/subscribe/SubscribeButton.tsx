'use client';
import { useState } from 'react';
import { PLANS } from '@/lib/stripe';

interface SubscribeButtonProps {
  planId: string;
  price: number;
  interval: 'month' | 'year';
}

export default function SubscribeButton({ planId, price, interval }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (data.demo || !data.url) {
        // Demo mode — show demo success state instead of alert
        const plan = PLANS.find((p) => p.id === planId);
        // Store demo premium in localStorage
        localStorage.setItem('horoscope-premium', JSON.stringify({ plan: planId, active: true }));
        setDemoSuccess(true);
        // Reload to apply premium state
        setTimeout(() => { window.location.reload(); }, 1500);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || '請稍後再試');
        setLoading(false);
      }
    } catch {
      setError('網路連線失敗，請檢查網路後再試');
      setLoading(false);
    }
  };

  if (demoSuccess) {
    return (
      <div className="subscribe-plan-btn subscribe-plan-btn-demo-success">
        ✅ 示範模式：Premium 已解鎖！
      </div>
    );
  }

  return (
    <div className="subscribe-btn-wrapper">
      <button
        className="subscribe-plan-btn"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? '連接到 Stripe 付款頁面...' : `立即升級 — NT$ ${price}/${interval === 'month' ? '月' : '年'}`}
      </button>
      {error && <p className="subscribe-btn-error">{error}</p>}
      {!error && !loading && (
        <p className="subscribe-btn-hint">可用信用卡 / 金融卡安全結帳</p>
      )}
    </div>
  );
}
