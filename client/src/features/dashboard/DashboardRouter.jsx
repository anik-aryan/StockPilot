import { useAuth } from "../../app/AuthContext";

import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import StaffDashboard from "./StaffDashboard";

export default function DashboardRouter() {
  const { user } = useAuth();

  switch (user?.role) {
    case "admin":
      return <AdminDashboard />;

    case "manager":
      return <ManagerDashboard />;

    case "staff":
      return <StaffDashboard />;

    default:
      return null;
  }
}