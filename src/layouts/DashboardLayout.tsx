import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-background">
    <AppSidebar />
    <main className="flex-1 ml-[250px] transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </div>
    </main>
  </div>
);

export default DashboardLayout;
