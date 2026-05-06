// Stripe utilities — demo mode with API route ready for production

export interface CheckoutSession {
  id: string;
  url: string | null;
  status: 'open' | 'complete';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: 'month' | 'year';
  features: string[];
}

export const PLANS: PricingPlan[] = [
  {
    id: 'monthly',
    name: '月度 Premium',
    price: 120,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY || 'price_mock_monthly_120twd',
    interval: 'month',
    features: [
      '每日運勢（愛情/事業/財運/健康）',
      '每週運勢完整分析',
      '塔羅占卜（每日免費1次）',
      '個人化命盤（上升/太陽/月亮）',
      '進階相容度分析（無限次）',
    ],
  },
  {
    id: 'yearly',
    name: '年度 Premium',
    price: 999,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY || 'price_mock_yearly_999twd',
    interval: 'year',
    features: [
      '所有月度功能',
      '年度星座預言搶先看',
      '每月星座專題深度內容',
      '優先新功能體驗',
    ],
  },
];

export async function redirectToCheckout(planId: string): Promise<void> {
  try {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId }),
    });

    const data = await res.json();

    if (data.demo || !data.url) {
      // Demo mode — show upgrade modal instead
      const plan = PLANS.find((p) => p.id === planId);
      alert(
        `示範模式：您選擇了「${plan?.name}」\n\n` +
        `在正式環境中，將跳轉至 Stripe Checkout 付款頁面。\n\n` +
        `請設定真實的 Stripe API Keys 以啟用付款功能。`
      );
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (err) {
    console.error('[Stripe] Checkout error:', err);
    alert('付款頁面載入失敗，請稍後再試。');
  }
}
