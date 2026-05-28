// Vercel Serverless Function — POST /api/create-order
// Required env vars (set in Vercel dashboard):
//   RAZORPAY_KEY_ID
//   RAZORPAY_KEY_SECRET

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(500).json({ error: "Razorpay keys not configured" });
  }

  const { plan } = req.body;
  if (!plan || !["monthly", "annual"].includes(plan)) {
    return res.status(400).json({ error: "Invalid plan" });
  }

  const amount = plan === "monthly" ? 9900 : 79900; // paise (₹99 or ₹799)

  try {
    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `exdetox_${plan}_${Date.now()}`,
        notes: { plan },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.description || "Razorpay order creation failed");
    }

    const order = await response.json();
    return res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error("create-order error:", err);
    return res.status(500).json({ error: err.message || "Failed to create order" });
  }
}
