import { Link, useLocation } from "wouter";
import { Home, ClipboardList, BookOpen, BarChart2, Settings, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProStatus } from "@/hooks/use-pro-status";

export function BottomNav() {
  const [location] = useLocation();
  const { isPro } = useProStatus();

  const links = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/quiz", icon: ClipboardList, label: "Quiz" },
    { href: "/journal", icon: BookOpen, label: "Journal", pro: true },
    { href: "/analytics", icon: BarChart2, label: "Stats", pro: true },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {links.map(({ href, icon: Icon, label, pro }) => {
          const isActive = location === href;
          const isLocked = pro && !isPro;
          return (
            <Link key={href} href={href} className="w-full h-full flex items-center justify-center">
              <div
                data-testid={`nav-${label.toLowerCase()}`}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors relative",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {isLocked && !isPro && (
                    <Crown
                      size={9}
                      className="absolute -top-1 -right-1 text-primary fill-primary"
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
                {isActive && (
                  <div className="absolute top-0 w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
