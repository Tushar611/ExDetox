const CODE_KEY = "exdetox_referral_code";
const USED_KEY = "exdetox_referral_used";
const COUNT_KEY = "exdetox_referral_count";

function makeCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function getMyReferralCode(): string {
  let code = localStorage.getItem(CODE_KEY);
  if (!code) {
    code = makeCode();
    localStorage.setItem(CODE_KEY, code);
  }
  return code;
}

export function getReferralShareUrl(code: string): string {
  const base = typeof window !== "undefined" ? window.location.origin : "https://exdetox.app";
  return `${base}/?ref=${code}`;
}

export function hasUsedReferral(): boolean {
  return localStorage.getItem(USED_KEY) === "true";
}

export function activateReferralTrial(): void {
  if (hasUsedReferral()) return;
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  localStorage.setItem("exdetox_pro_plan", JSON.stringify("trial"));
  localStorage.setItem("exdetox_trial_expires", JSON.stringify(expires));
  localStorage.setItem(USED_KEY, "true");
}

export function getReferralCount(): number {
  return Number(localStorage.getItem(COUNT_KEY) ?? 0);
}

export function incrementReferralCount(): void {
  const n = getReferralCount();
  localStorage.setItem(COUNT_KEY, String(n + 1));
}

export function getReferralFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("ref");
}
