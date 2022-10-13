import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirection from "./Redirection";

export const SETTINGS_NAVLINKS = [
  {
    key: "general",
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    path: "/settings?tab=general",
    component: General,
  },
  {
    key: "redirection",
    label: "Redirection",
    description: "Create & configure redirection rules",
    path: "/settings?tab=redirection",
    component: Redirection,
  },
  {
    key: "manageCategories",
    label: "Manage Categories",
    description: "Edit & Reorder KB Structure",
    path: "/settings?tab=manageCategories",
    component: ManageCategories,
  },
];
