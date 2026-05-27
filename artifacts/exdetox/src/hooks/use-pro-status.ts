import { useLocalStorage } from "@/hooks/use-local-storage";

export type ProPlan = "monthly" | "annual" | null;

export function useProStatus() {
  const [plan, setPlan] = useLocalStorage<ProPlan>("exdetox_pro_plan", null);

  const isPro = plan !== null;

  const activate = (selectedPlan: "monthly" | "annual") => {
    setPlan(selectedPlan);
  };

  const deactivate = () => {
    setPlan(null);
  };

  return { isPro, plan, activate, deactivate };
}
