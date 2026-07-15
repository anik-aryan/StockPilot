import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WarehouseStockChart({
  data,
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="warehouse" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#10b981"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}