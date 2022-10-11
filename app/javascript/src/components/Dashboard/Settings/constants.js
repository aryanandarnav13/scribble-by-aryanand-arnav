import General from "./General";

export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    path: "/settings?tab=general",
    component: General,
  },
  {
    key: "redirections",
    label: "Redirections",
    description: "Create & configure redirection rules",
  },
  {
    key: "manageCategories",
    label: "Manage Categories",
    description: "Edit & Reorder KB Structure",
  },
];
