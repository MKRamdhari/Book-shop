// app/api/create-checkout-session/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { saveTransaction } from "@/lib/transactions";

const BASE_URL = process.env.BASE_URL??"";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const expiryHours = Number(process.env.URL_EXPIRY_HOURS ?? 1);
const PRICE_ID = process.env.PRICE_ID as string ?? "" ;

export async function POST() {
    try{
        
        return NextResponse.json({ url: "" });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
