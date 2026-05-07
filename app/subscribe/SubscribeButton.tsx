'use client';
import { useState } from 'react';
import { redirectToCheckout } from '@/lib/stripe';

interface SubscribeButtonProps {
  planId: string;
  price: number;
  interval: 'month' | 'year';
}

export default function SubscribeButton({ planId, price, interval }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await redirectToCheckout(planId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="subscribe-plan-btn"
      onClick={handleSubscribe}
      disabled={loading}
    >
      {loading ? '連接中...' : `立即升級 — NT$ ${price}/${interval === 'month' ? '月' : '年'}`}
    </button>
  );
}
