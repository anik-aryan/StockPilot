export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <h2 className="text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
}