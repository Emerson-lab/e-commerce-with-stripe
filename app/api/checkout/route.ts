import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "src/lib/stripe";
import { Product } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";

export async function POST(request: NextResponse) {

  const cartDetails = await request.json();
  const baseURL = request.headers.get('origin');

  const stripeInvetory = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = stripeInvetory.data.map((product: Stripe.Product): Product => {
    return {
      id: product.id,
      name: product.name,
      price: (product.default_price as Stripe.Price)?.unit_amount ?? 0,
      currency: (product.default_price as Stripe.Price).currency ?? 'BRL',
      image: product.images[0],
      images: product.images,
    }
  })

  const line_items = validateCartItems(products, cartDetails);

  console.log(line_items)

  const session = await stripe.checkout.sessions.create({
    success_url: `${baseURL}/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseURL}/cart`,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: line_items
  })

  return NextResponse.json(session, { status: 200 })
}