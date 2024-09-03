import { HomeIcon, ClipboardList } from "lucide-react";
import Index from "./pages/Index.jsx";
import CreateSurvey from "./pages/CreateSurvey.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Create Survey",
    to: "/create-survey",
    icon: <ClipboardList className="h-4 w-4" />,
    page: <CreateSurvey />,
  },
];