import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        form,
        {
          withCredentials: true,
        }
      );

      const user = res.data.data;

        localStorage.setItem(
        "user",
        JSON.stringify(user)
        );

        if (user.role === "admin") {
        navigate("/dashboard");
        }

        if (user.role === "manager") {
        navigate("/dashboard");
        }

        if (user.role === "staff") {
        navigate("/dashboard");
        }
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      <div className="hidden lg:flex w-1/2 bg-emerald-700 text-white p-16 flex-col justify-center">
        <h1 className="text-5xl font-bold mb-6">
          StockPilot
        </h1>

        <h2 className="text-4xl font-semibold leading-tight mb-6">
          Modern Warehouse
          <br />
          Management Platform
        </h2>

        <p className="text-lg text-emerald-100 max-w-lg">
          Manage inventory, warehouses,
          stock movements, analytics and
          users from one centralized system.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            📦 Inventory Tracking
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            🏢 Multi Warehouse
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            📊 Analytics
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            ⚠️ Smart Alerts
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-slate-500 mb-8">
            Login to continue to StockPilot
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition"
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}