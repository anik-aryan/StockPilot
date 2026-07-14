import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import StaffDashboard from "./StaffDashboard";

export default function DashboardRouter() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  switch (user?.role) {
    case "admin":
      return <AdminDashboard />;

    case "manager":
      return <ManagerDashboard />;

    case "staff":
      return <StaffDashboard />;

    default:
      return <StaffDashboard />;
  }
}