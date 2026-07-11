export default function Logo() {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
        S
      </div>

      <div>
        <h1 className="text-lg font-bold text-slate-900">
          StockPilot
        </h1>

        <p className="text-xs text-slate-500">
          Warehouse Management
        </p>
      </div>
    </div>
  );
}