import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-slate-50 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}