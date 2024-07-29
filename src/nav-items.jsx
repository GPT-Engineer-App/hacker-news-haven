import { Newspaper } from "lucide-react";
import Index from "./pages/Index.jsx";
import Story from "./pages/Story.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Hacker News",
    to: "/",
    icon: <Newspaper className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Story",
    to: "/story/:id",
    page: <Story />,
    hidden: true,
  },
];
