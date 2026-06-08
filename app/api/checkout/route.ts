import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { allProducts } from "@/lib/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in cart" },
        { status: 400 }
      );
    }

    // Build line items from cart
    const lineItems = items.map((item: { id: string; qty: number }) => {
      const product = allProducts.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product ${item.id} not found`);
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
            metadata: {
              productId: product.id,
            },
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: item.qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/`,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
