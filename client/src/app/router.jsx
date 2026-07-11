import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Products from "../features/products/pages/Products";
import Warehouses from "../features/warehouses/pages/Warehouses";
import Inventory from "../features/inventory/pages/Inventory";
import Stock from "../features/stock/pages/Stock";
import Users from "../features/users/pages/Users";
import Alerts from "../features/alerts/pages/Alerts";
import Reports from "../features/reports/pages/Reports";
import Settings from "../features/settings/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "warehouses",
        element: <Warehouses />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "stock",
        element: <Stock />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;