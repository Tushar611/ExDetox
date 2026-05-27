import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/AppLayout";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import Quiz from "@/pages/quiz";
import Settings from "@/pages/settings";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect } from "react";

function Router() {
  const [location, setLocation] = useLocation();
  const [started] = useLocalStorage("exdetox_started", false);

  useEffect(() => {
    if (!started && location !== "/" && location !== "/onboarding") {
      setLocation("/onboarding");
    } else if (started && (location === "/" || location === "/onboarding")) {
      setLocation("/dashboard");
    }
  }, [started, location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Onboarding} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppLayout>
          <Router />
        </AppLayout>
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
