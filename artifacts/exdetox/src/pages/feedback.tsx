import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Feedback() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    }
  }, [user, setLocation]);

  if (!user) {
    return null;
  }

  // Pre-fill user email in the form URL
  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdPmuzaKnD6-tEJ_R-cDuIU67TmpxLa7D0oaltkOpXczEQoGQ/viewform?usp=pp_url&entry.EMAIL=${encodeURIComponent(user.email || "")}`;

  // Redirect directly to Google Form
  useEffect(() => {
    window.location.href = formUrl;
  }, [formUrl]);

  return null;
}
