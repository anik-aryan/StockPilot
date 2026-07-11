import {
  LayoutDashboard,
  Warehouse,
  Boxes,
  Package,
  ArrowLeftRight,
  Users,
  Bell,
  FileText,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Warehouses", path: "/warehouses", icon: Warehouse },
  { title: "Products", path: "/products", icon: Boxes },
  { title: "Inventory", path: "/inventory", icon: Package },
  { title: "Stock Movement", path: "/stock", icon: ArrowLeftRight },
  { title: "Users", path: "/users", icon: Users },
  { title: "Alerts", path: "/alerts", icon: Bell },
  { title: "Reports", path: "/reports", icon: FileText },
  { title: "Settings", path: "/settings", icon: Settings },
];