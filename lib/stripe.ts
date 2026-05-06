// Mock Stripe utilities for demo purposes
// In production, replace with real Stripe SDK calls

export interface CheckoutSession {
  id: string;
  url: string;
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
    priceId: 'price_mock_monthly_120twd',
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
    priceId: 'price_mock_yearly_999twd',
    interval: 'year',
    features: [
      '所有月度功能',
      '年度星座預言搶先看',
      '每月星座專題深度內容',
      '優先新功能體驗',
    ],
  },
];

// Mock createCheckoutSession - in production, call your /api/create-checkout endpoint
export async function createCheckoutSession(planId: string): Promise<CheckoutSession> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 800));

  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) throw new Error('Invalid plan');

  // In production, this would call Stripe Checkout
  // window.location.href = `https://checkout.stripe.com/...`
  console.log(`[Mock Stripe] Creating checkout session for plan: ${planId}`);

  return {
    id: `cs_mock_${Date.now()}`,
    url: `#mock-checkout-${planId}`,
    status: 'open',
  };
}

export async function redirectToCheckout(planId: string): Promise<void> {
  const session = await createCheckoutSession(planId);
  // In demo mode, show a mock confirmation
  console.log(`[Mock Stripe] Would redirect to: ${session.url}`);
  alert(`示範模式：您選擇了「${PLANS.find(p => p.id === planId)?.name}」\n\n在正式環境中，將跳轉至 Stripe Checkout 付款頁面。\n\nPlan ID: ${planId}`);
}
