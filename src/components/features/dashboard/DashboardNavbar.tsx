import LogoutButton from "../auth/components/SignoutButton";

export const DashboardNavbar = () => {
  return (
    <nav className="flex justify-end py-4">
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
};
