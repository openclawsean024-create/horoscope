import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 400 });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2026-04-22.dahlia' });
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('[Webhook] Signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('[Webhook] Checkout completed:', session.id);
      // TODO: Update user's subscription status in database (Supabase, etc.)
      // await supabase.from('subscriptions').upsert({ user_id: session.metadata?.userId, status: 'active', ... })
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('[Webhook] Subscription cancelled:', subscription.id);
      // TODO: Update user's subscription status to inactive
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('[Webhook] Payment failed:', invoice.id);
      // TODO: Notify user of payment failure
      break;
    }
    default:
      console.log(`[Webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
