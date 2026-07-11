import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center rounded-xl border px-4 py-2">
          <Search size={18} />
          <input
            className="ml-2 outline-none"
            placeholder="Search..."
          />
        </div>

        <Bell />

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />

      </div>

    </header>
  );
}