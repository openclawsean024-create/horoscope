import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Demo mode: use test key if available, otherwise return mock response
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

function getStripe() {
  if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === 'sk_test_placeholder') {
    return null;
  }
  return new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2026-04-22.dahlia' });
}

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();

    if (!plan || !['monthly', 'yearly'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const stripe = getStripe();

    if (!stripe) {
      // Demo mode: return a mock checkout URL for demonstration
      const baseUrl = req.headers.get('origin') || 'https://horoscope-lake-eight.vercel.app';
      return NextResponse.json({
        demo: true,
        message: 'Stripe not configured — demo mode',
        checkoutUrl: `${baseUrl}?premium=${plan}&demo=1`,
      });
    }

    const prices: Record<string, { unitAmount: number; name: string; interval: 'month' | 'year' }> = {
      monthly: { unitAmount: 12000, name: '星座 Premium 月費', interval: 'month' },
      yearly: { unitAmount: 99900, name: '星座 Premium 年費', interval: 'year' },
    };

    const price = prices[plan];
    const baseUrl = req.headers.get('origin') || 'https://horoscope-lake-eight.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'twd',
            product_data: { name: price.name },
            unit_amount: price.unitAmount,
            recurring: { interval: price.interval },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}?checkout=success&plan=${plan}`,
      cancel_url: `${baseUrl}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
