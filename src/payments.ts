import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export async function createPayment(amount: number, cardToken: string): Promise<string> {
  const charge = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method: cardToken,
    confirm: true,
    automatic_payment_methods: { enabled: true },
    description: "Order payment",
  });
  return charge.id;
}

export async function getPayment(chargeId: string) {
  const charge = await stripe.paymentIntents.retrieve(chargeId);
  return { id: charge.id, amount: charge.amount, status: charge.status };
}

export async function listPayments(customerId: string) {
  const charges = await stripe.paymentIntents.list({ customer: customerId, limit: 25 });
  return charges.data;
}