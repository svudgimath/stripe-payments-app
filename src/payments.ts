import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export async function createPayment(amount: number, cardToken: string): Promise<string> {
  const charge = await stripe.charges.create({
    amount,
    currency: "usd",
    source: cardToken,
    description: "Order payment",
  });
  return charge.id;
}

export async function getPayment(chargeId: string) {
  const charge = await stripe.charges.retrieve(chargeId);
  return { id: charge.id, amount: charge.amount, status: charge.status };
}

export async function listPayments(customerId: string) {
  const charges = await stripe.charges.list({ customer: customerId, limit: 25 });
  return charges.data;
}