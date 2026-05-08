import Link from 'next/link';
import { Metadata } from 'next';
import { PLANS } from '@/lib/stripe';
import SubscribeButton from './SubscribeButton';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '訂閱 Premium | Stella Chart 星座命盤',
  description: '升級 Stella Chart Premium，解鎖完整星座運勢、塔羅占卜與進階分析。',
};

export default function SubscribePage() {
  return (
    <div className="subscribe-page">
      <div className="subscribe-hero">
        <div className="section-label">Premium Access</div>
        <h1 className="subscribe-title">解鎖完整星象體驗</h1>
        <div className="section-ornament">
          <span className="section-ornament-line" />
          <span className="section-ornament-star">✦</span>
          <span className="section-ornament-line" />
        </div>
        <p className="subscribe-subtitle">
          選擇適合你的方案，開啟完整的星象引導
        </p>
      </div>

      <div className="subscribe-content">
        <div className="subscribe-plans-grid">
          {PLANS.map((plan) => (
            <div key={plan.id} className={`subscribe-plan-card ${plan.id === 'yearly' ? 'featured' : ''}`}>
              {plan.id === 'yearly' && (
                <div className="subscribe-plan-badge">限時優惠 · 省 17%</div>
              )}
              <div className="subscribe-plan-name">{plan.name}</div>
              <div className="subscribe-plan-price">
                <span className="subscribe-plan-currency">NT$</span>
                <span className="subscribe-plan-amount">{plan.price}</span>
                <span className="subscribe-plan-interval">/{plan.interval === 'month' ? '月' : '年'}</span>
              </div>
              {plan.interval === 'year' && (
                <div className="subscribe-plan-savings">相當於 NT$83/月</div>
              )}

              <div className="subscribe-plan-divider" />

              <ul className="subscribe-plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="subscribe-plan-feature">
                    <span className="subscribe-plan-feature-check">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <SubscribeButton planId={plan.id} price={plan.price} interval={plan.interval} />
            </div>
          ))}
        </div>

        <div className="subscribe-trust">
          <div className="subscribe-trust-item">
            <span className="subscribe-trust-icon">🔒</span>
            <span>安全加密付款</span>
          </div>
          <div className="subscribe-trust-item">
            <span className="subscribe-trust-icon">💳</span>
            <span>支援信用卡 / LINE Pay</span>
          </div>
          <div className="subscribe-trust-item">
            <span className="subscribe-trust-icon">✕</span>
            <span>隨時取消</span>
          </div>
        </div>

        <p className="subscribe-note">
          目前為展示模式。請設定 Stripe API Keys 以啟用真實付款。
        </p>
      </div>
    </div>
  );
}
