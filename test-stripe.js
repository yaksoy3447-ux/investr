const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia"
});

async function main() {
  try {
    const promoCodes = await stripe.promotionCodes.list({ active: true, limit: 100 });
    console.log("All Active Promo Codes:", promoCodes.data.map(p => ({
       id: p.id,
       code: p.code,
       coupon: p.coupon.id
    })));

    const coupons = await stripe.coupons.list({ limit: 100 });
    console.log("All Coupons:", coupons.data.map(c => ({
       id: c.id,
       name: c.name,
       valid: c.valid
    })));

  } catch (err) {
    console.error(err);
  }
}
main();
