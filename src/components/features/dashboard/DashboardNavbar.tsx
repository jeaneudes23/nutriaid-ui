import { BellIcon } from "lucide-react";

export const DashboardNavbar = () => {
  return (
    <nav>
      <div className="bg-background container flex justify-end rounded-md py-3">
        <div>
          <BellIcon />
        </div>
      </div>
    </nav>
  );
};
