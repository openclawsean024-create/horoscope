import { NextRequest, NextResponse } from 'next/server';

// In production, these would come from environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const PRICE_ID_MONTHLY = process.env.STRIPE_PRICE_ID_MONTHLY || 'price_monthly_120twd';
const PRICE_ID_YEARLY = process.env.STRIPE_PRICE_ID_YEARLY || 'price_yearly_999twd';

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json();

    if (!planId || !['monthly', 'yearly'].includes(planId)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Demo mode: return mock session
    if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === '') {
      return NextResponse.json({
        id: `cs_demo_${Date.now()}`,
        url: null, // No redirect URL in demo
        demo: true,
        message: 'Stripe not configured — demo mode',
      });
    }

    const priceId = planId === 'monthly' ? PRICE_ID_MONTHLY : PRICE_ID_YEARLY;
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'subscription',
        'payment_method_types[]': 'card',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'success_url': `${origin}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
        'cancel_url': `${origin}/subscribe/cancel`,
        'locale': 'zh-TW',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const session = await response.json();
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('[Stripe] Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
