import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export async function createCustomer(email: string, name: string, cardToken: string) {
  const customer = await stripe.customers.create({ email, name, source: cardToken });
  return customer;
}

export async function startSubscription(customerId: string, priceId: string) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
  });
  return subscription;
}