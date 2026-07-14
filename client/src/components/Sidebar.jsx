import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../constants/sidebar";

export default function Sidebar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role || "staff";

  const menu = SIDEBAR_ITEMS[role];

  return (
    <aside className="w-64 bg-emerald-800 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        StockPilot
      </h1>

      <div className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-emerald-600"
                  : "hover:bg-emerald-700"
              }`
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}