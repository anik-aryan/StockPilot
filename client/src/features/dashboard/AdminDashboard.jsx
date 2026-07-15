import { useEffect, useState } from "react";

import { getProducts } from "../../services/productService";
import { getWarehouses } from "../../services/warehouseService";
import { getInventory } from "../../services/inventoryService";
import { getMovementHistory } from "../../services/dashboardService";
import WarehouseStockChart from "../../components/charts/WarehouseStockChart";
import InventoryPieChart from "../../components/charts/InventoryPieChart";
export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalWarehouses: 0,
    totalInventoryValue: 0,
    lowStockAlerts: 0,
  });

  const [recentMovements, setRecentMovements] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [warehouseData, setWarehouseData] =
  useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [
        productsRes,
        warehousesRes,
        inventoryRes,
        historyRes,
      ] = await Promise.all([
        getProducts(),
        getWarehouses(),
        getInventory(),
        getMovementHistory(),
      ]);

      const inventory =
        inventoryRes?.data?.data?.inventory || [];

      const totalInventoryValue = inventory.reduce(
        (sum, item) =>
          sum + (item.inventoryValue || 0),
        0
      );

      const lowStock = inventory.filter(
        (item) =>
          item.availableQuantity <=
          item.product?.reorderLevel
      );
      const warehouseMap = {};

      inventory.forEach((item) => {
        const warehouse =
          item.warehouse?.name ||
          "Unknown";

        if (!warehouseMap[warehouse]) {
          warehouseMap[warehouse] = 0;
        }

        warehouseMap[warehouse] +=
          item.inventoryValue || 0;
      });

      const chartData = Object.entries(
        warehouseMap
      ).map(([warehouse, value]) => ({
        warehouse,
        value,
      }));

      setWarehouseData(chartData);
      setStats({
        totalProducts:
          productsRes?.data?.data?.total || 0,

        totalWarehouses:
          warehousesRes?.data?.data?.total || 0,

        totalInventoryValue,

        lowStockAlerts: lowStock.length,
      });

      setLowStockItems(lowStock);

      setRecentMovements(
        historyRes?.data?.data?.history || []
      );
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            Combined analytics across all
            warehouses
          </p>
        </div>

        <span className="mt-3 md:mt-0 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
          System Active
        </span>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Card
          title="📦 Total Products"
          value={stats.totalProducts}
        />

        <Card
          title="🏢 Total Warehouses"
          value={stats.totalWarehouses}
        />

        <Card
          title="💰 Inventory Value"
          value={`₹${stats.totalInventoryValue.toLocaleString()}`}
        />

        <Card
          title="⚠️ Low Stock Alerts"
          value={stats.lowStockAlerts}
        />
      </div>

      {/* Charts Placeholder */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold mb-4">
            Warehouse Wise Stock Comparison
          </h2>

          <div className="h-72 flex items-center justify-center text-slate-400">
            <WarehouseStockChart
              data={warehouseData}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-semibold mb-4">
            Inventory Distribution
          </h2>

          <div className="h-72 flex items-center justify-center text-slate-400">
            <InventoryPieChart
              data={warehouseData}
            />
          </div>
        </div>
      </div>

      {/* Recent Movements */}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-semibold">
            Recent Stock Movements
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 text-left">
                <th className="p-4">
                  Reference
                </th>

                <th className="p-4">
                  Product
                </th>

                <th className="p-4">
                  Type
                </th>

                <th className="p-4">
                  Quantity
                </th>
              </tr>
            </thead>

            <tbody>
              {recentMovements
                ?.slice(0, 5)
                .map((item, index) => (
                  <tr
                    key={
                      item.referenceNo ||
                      index
                    }
                    className="border-b"
                  >
                    <td className="p-4">
                      {item.referenceNo ||
                        "-"}
                    </td>

                    <td className="p-4">
                      {typeof item.product ===
                      "object"
                        ? item.product?.name
                        : item.product || "-"}
                    </td>

                    <td className="p-4">
                      {item.type || "-"}
                    </td>

                    <td className="p-4">
                      {item.quantity || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Products */}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="font-semibold">
            Low Stock Products
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50 text-left">
                <th className="p-4">
                  Product
                </th>

                <th className="p-4">
                  Available
                </th>

                <th className="p-4">
                  Reorder Level
                </th>

                <th className="p-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {lowStockItems.map(
                (item, index) => (
                  <tr
                    key={
                      item._id || index
                    }
                    className="border-b"
                  >
                    <td className="p-4">
                      {
                        item.product?.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        item.availableQuantity
                      }
                    </td>

                    <td className="p-4">
                      {
                        item.product
                          ?.reorderLevel
                      }
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                        Low Stock
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="text-4xl font-bold text-slate-800 mt-3">
        {value}
      </h3>
    </div>
  );
}