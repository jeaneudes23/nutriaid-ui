import { CONFIG } from "@/lib/config";

export const AppLogo = () => {
  return (
    <span className="text-primary font-heading text-xl font-bold">
      <span className="hidden lg:inline">{CONFIG.app_name}</span>
      <span className="inline lg:hidden">{CONFIG.app_name.slice(0, 4)}</span>
    </span>
  );
};
