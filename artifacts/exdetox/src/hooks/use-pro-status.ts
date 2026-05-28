import { useLocalStorage } from "@/hooks/use-local-storage";

export type ProPlan = "monthly" | "annual" | "trial" | null;

export function useProStatus() {
  const [plan, setPlan] = useLocalStorage<ProPlan>("exdetox_pro_plan", null);
  const [trialExpires] = useLocalStorage<number | null>("exdetox_trial_expires", null);

  const trialActive = plan === "trial" && trialExpires !== null && Date.now() < trialExpires;
  const trialDaysLeft = trialActive && trialExpires
    ? Math.max(0, Math.ceil((trialExpires - Date.now()) / 86_400_000))
    : 0;

  const isPro = plan === "monthly" || plan === "annual" || trialActive;

  const activate = (selectedPlan: "monthly" | "annual") => setPlan(selectedPlan);
  const deactivate = () => setPlan(null);

  return { isPro, plan, trialActive, trialDaysLeft, activate, deactivate };
}
