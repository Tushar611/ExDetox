// Dynamically loads the Razorpay checkout script and returns the Razorpay constructor.

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

export function loadRazorpay(): Promise<RazorpayConstructor> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));

    if (window.Razorpay) {
      return resolve(window.Razorpay);
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      const rp = window.Razorpay;
      if (rp) resolve(rp);
      else reject(new Error("Razorpay script loaded but constructor not found"));
    };
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  theme: { color: string };
  prefill?: { name?: string; email?: string; contact?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss: () => void };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export type RazorpayConstructor = new (options: RazorpayOptions) => { open(): void };

export {};
