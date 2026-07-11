export default function SidebarItem({
  icon: Icon,
  title,
  active = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-emerald-100 text-emerald-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon size={20} />
      <span>{title}</span>
    </button>
  );
}