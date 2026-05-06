'use client';

import { useState } from 'react';
import { PLANS, redirectToCheckout } from '@/lib/stripe';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureContext?: string;
}

export default function SubscribeModal({ isOpen, onClose, featureContext }: SubscribeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const selected = PLANS.find((p) => p.id === selectedPlan)!;

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await redirectToCheckout(selectedPlan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paywall-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="paywall-modal">
        <button className="paywall-close" onClick={onClose} aria-label="關閉">×</button>

        <div className="paywall-header">
          <div className="paywall-icon">✦</div>
          <div className="paywall-eyebrow">Premium Access</div>
          <h2 className="paywall-title">解鎖完整星座命盤</h2>
          <p className="paywall-subtitle">
            {featureContext
              ? `「${featureContext}」為 Premium 專屬功能`
              : '升級 Stella Chart Premium，開啟完整星象之旅'}
          </p>
        </div>

        <div className="paywall-plans">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`paywall-plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id as 'monthly' | 'yearly')}
            >
              {plan.id === 'yearly' && (
                <div className="paywall-plan-badge">限時優惠</div>
              )}
              <div className="paywall-plan-name">{plan.name}</div>
              <div className="paywall-plan-price">
                <span className="paywall-plan-currency">NT$</span>
                <span className="paywall-plan-amount">{plan.price}</span>
                <span className="paywall-plan-interval">/{plan.interval === 'month' ? '月' : '年'}</span>
              </div>
              {plan.interval === 'year' && (
                <div className="paywall-plan-savings">相當於 $83/月，省更多</div>
              )}
            </div>
          ))}
        </div>

        <div className="paywall-features">
          <div className="paywall-features-title">完整功能</div>
          {selected.features.map((f, i) => (
            <div key={i} className="paywall-feature-item">
              <span className="paywall-feature-check">✦</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <button
          className="paywall-subscribe-btn"
          onClick={handleSubscribe}
          disabled={loading}
        >
          {loading ? '連接中...' : `立即升級 — NT$ ${selected.price}/${selected.interval === 'month' ? '月' : '年'}`}
        </button>

        <div className="paywall-footer">
          <span>安全加密付款</span>
          <span>·</span>
          <span>支援信用卡 / LINE Pay</span>
          <span>·</span>
          <span>隨時取消</span>
        </div>

        <div className="paywall-stripe-note">
          示範模式 — 僅供展示，請替換真實 Stripe Keys 以啟用付款
        </div>
      </div>
    </div>
  );
}
