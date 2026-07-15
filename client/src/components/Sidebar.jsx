import { NavLink, useNavigate } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../constants/sidebar";
import { useAuth } from "../app/AuthContext";
import { logout } from "../services/authService";

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || "staff";

  const menu = SIDEBAR_ITEMS[role];

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login");

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-emerald-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-emerald-700">
        <h1 className="text-2xl font-bold">
          StockPilot
        </h1>

        <p className="text-sm text-emerald-200 mt-1">
          {user?.firstName} {user?.lastName}
        </p>

        <p className="text-xs text-emerald-300 capitalize">
          {user?.role}
        </p>
      </div>

      
      <div className="flex-1 p-4 space-y-2">
        {menu?.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
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

     
      <div className="p-4 border-t border-emerald-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}