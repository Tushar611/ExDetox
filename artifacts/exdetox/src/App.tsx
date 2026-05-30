import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/AppLayout";
import Landing from "@/pages/landing";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import Quiz from "@/pages/quiz";
import Settings from "@/pages/settings";
import Journal from "@/pages/journal";
import Analytics from "@/pages/analytics";
import Upgrade from "@/pages/upgrade";
import Situationship from "@/pages/situationship";
import ExAnalysis from "@/pages/ex-analysis";
import ShadowWork from "@/pages/shadow-work";
import AttachmentQuiz from "@/pages/attachment-quiz";
import HealingCard from "@/pages/healing-card";
import Auth from "@/pages/auth";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { getReferralFromUrl, activateReferralTrial, hasUsedReferral, incrementReferralCount } from "@/lib/referral";
import { useEffect } from "react";

function Router() {
  const [location, setLocation] = useLocation();
  const [started] = useLocalStorage("exdetox_started", false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const refCode = getReferralFromUrl();
    if (refCode && !hasUsedReferral()) {
      activateReferralTrial();
      incrementReferralCount();
      const url = new URL(window.location.href);
      url.searchParams.delete("ref");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/auth", "/upgrade"];

    // Not logged in → send to /auth (except public routes)
    if (!user && !publicRoutes.includes(location)) {
      setLocation("/auth");
      return;
    }

    // Logged in, not started → onboarding
    if (user && !started && location !== "/onboarding" && !publicRoutes.includes(location)) {
      setLocation("/onboarding");
      return;
    }

    // Logged in, started, on onboarding → dashboard
    if (user && started && location === "/onboarding") {
      setLocation("/dashboard");
      return;
    }

    // Logged in, on /auth → dashboard
    if (user && location === "/auth") {
      setLocation(started ? "/dashboard" : "/onboarding");
      return;
    }
  }, [user, loading, started, location, setLocation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/journal" component={Journal} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/upgrade" component={Upgrade} />
      <Route path="/situationship" component={Situationship} />
      <Route path="/ex-analysis" component={ExAnalysis} />
      <Route path="/shadow-work" component={ShadowWork} />
      <Route path="/attachment-quiz" component={AttachmentQuiz} />
      <Route path="/healing-card" component={HealingCard} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppLayout>
            <Router />
          </AppLayout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
