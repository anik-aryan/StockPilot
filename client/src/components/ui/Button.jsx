export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  loading = false,
  ...props
}) {
  const variants = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 text-white",

    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-900",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`rounded-xl px-5 py-3 font-medium transition duration-200 disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}