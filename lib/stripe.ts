import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRETE!, {
  apiVersion: "2023-08-16"
});

export default stripe