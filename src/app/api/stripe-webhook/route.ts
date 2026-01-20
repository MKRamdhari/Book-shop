export const runtime = "nodejs";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error("Webhook signature verification failed.");
    return new NextResponse("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const transactionId = session.metadata?.transaction_id;

      if (!transactionId) break;

      const { error } = await supabase
        .from("transactions")
        .update({
          status: "paid",
          stripe_transaction_id: session.payment_intent as string,
          //paid_at: new Date().toISOString(),
        })
        .eq("transaction_id", transactionId);

      if (error) {
        console.error("Supabase update error:", error);
        return new NextResponse("DB error", { status: 500 });
      }

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      const transactionId = session.metadata?.transaction_id;

      if (!transactionId) break;

      await supabase
        .from("transactions")
        .update({ status: "expired" })
        .eq("transaction_id", transactionId);

      break;
    }
  }

  return NextResponse.json({ received: true });
}
