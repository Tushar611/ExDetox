import { Link, useLocation } from "wouter";
import { Home, ClipboardList, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const links = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/quiz", icon: ClipboardList, label: "Quiz" },
    { href: "/settings", icon: Settings, label: "Settings" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-4">
        {links.map(({ href, icon: Icon, label }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href} className="w-full h-full flex items-center justify-center">
              <div
                className={cn(
                  "flex flex-col items-center justify-center gap-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide">
                  {label}
                </span>
                {isActive && (
                  <div className="absolute top-1 w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary))]" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
