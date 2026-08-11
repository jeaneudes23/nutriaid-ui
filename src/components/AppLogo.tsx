import { CONFIG } from "@/lib/config";

export const AppLogo = () => {
  return <span className="text-primary font-heading text-xl font-bold">{CONFIG.app_name}</span>;
};
