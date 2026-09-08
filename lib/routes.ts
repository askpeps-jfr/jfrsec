import {
  Award,
  Boxes,
  LayoutDashboard,
  UserRoundCog,
  FlaskConical,
  TerminalSquare,
  type LucideIcon,
} from "lucide-react";

export type NavRoute = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navRoutes: NavRoute[] = [
  { id: "01", label: "HUB", href: "/", icon: LayoutDashboard },
  { id: "02", label: "CASE_STUDIES", href: "/case-studies", icon: FlaskConical },
  { id: "03", label: "THE_SANDBOX", href: "/sandbox", icon: Boxes },
  { id: "04", label: "CREDENTIALS", href: "/credentials", icon: Award },
  { id: "05", label: "ABOUT", href: "/about", icon: UserRoundCog },
  { id: "06", label: "CONTACT", href: "/contact", icon: TerminalSquare },
];
