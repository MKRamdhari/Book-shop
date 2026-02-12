export const runtime = "nodejs";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
// send email
const sendEmail = async (Email: string, Subject: string, emailType: string) => {
    const res = await fetch(`${baseUrl}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: Email,
            subject: Subject,
            emailType: emailType
        }),
    });

    return await res.json();
};

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
        //When stripe Payment done successfully
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const customerEmail = session.customer_details?.email ?? null;
            const transactionId = session.metadata?.transaction_id;

            if (!transactionId) break;

            const { error } = await supabase
                .from("transactions")
                .update({
                    status: "paid",
                    stripe_transaction_id: session.payment_intent as string,
                    email: customerEmail as string
                })
                .eq("transaction_id", transactionId);

            // check email and throe email
            if (customerEmail) {

                const mailType = `Access-Delivery*${transactionId}`;

                const results = await Promise.allSettled([
                    //sendEmail(customerEmail, emailSubject, mailType),
                    sendEmail(
                        customerEmail,
                        "Your Digital Edition is ready",
                        "Purchase-Confirmed"
                    ),
                    sendEmail(
                        customerEmail,
                        "Access to your Digital Edition",
                        mailType
                    ),
                ]);

                results.forEach((result, index) => {
                    if (result.status === "fulfilled") {
                        console.log(`email ${index + 1} success`, result.value);
                    } else {
                        console.error(`email ${index + 1} failed`, result.reason);
                        return new NextResponse("Mail error", { status: 500 });
                    }
                });

            }

            if (error) {
                console.error("Update error:", error);
                return new NextResponse("DB error", { status: 500 });
            }

            break;
        }

        //When stripe checkout session expired
        case "checkout.session.expired": {
            const session = event.data.object as Stripe.Checkout.Session;
            const transactionId = session.metadata?.transaction_id;
            const customerEmail = session.customer_details?.email ?? null;

            // check email and throe email
            if (customerEmail) {
                //Payment failed
                await sendEmail(customerEmail, "Your payment could not be completed.", "Payment-failed");
            }

            if (!transactionId) break;

            await supabase
                .from("transactions")
                .update({ status: "expired" })
                .eq("transaction_id", transactionId);

            break;
        }

        //When refund is success
        case "charge.refunded": {
            const charge = event.data.object as Stripe.Charge;
            await sendEmail(charge.billing_details.email!, "Your refund has been processed.", "refund-success");
            break;
        }

        //When stripe refund faild
        case "refund.failed": {
            const refund = event.data.object as Stripe.Refund;

            // You may need to retrieve charge to get email
            const chargeData = await stripe.charges.retrieve(
                refund.charge as string
            );

            await sendEmail(chargeData.billing_details.email!, "Your refund request has been reviewed.", "refund-faild");

            break;
        }

        return NextResponse.json({ received: true });
    }
