import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import DashboardRouter from "./features/dashboard/DashboardRouter";

import ProductsPage from "./features/products/ProductsPage";
import WarehousesPage from "./features/warehouses/WarehousesPage";
import InventoryPage from "./features/inventory/InventoryPage";
import UsersPage from "./features/users/UsersPage";
import ReportsPage from "./features/reports/ReportsPage";
import AlertsPage from "./features/alerts/AlertsPage";

function App() {
  return (
    <Routes>
      

      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<DashboardRouter />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/warehouses"
          element={<WarehousesPage />}
        />

        <Route
          path="/inventory"
          element={<InventoryPage />}
        />

        <Route
          path="/users"
          element={<UsersPage />}
        />

        <Route
          path="/reports"
          element={<ReportsPage />}
        />

        <Route
          path="/alerts"
          element={<AlertsPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;