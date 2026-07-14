import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
     
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-emerald-600">
          StockPilot
        </h1>

        <Link
          to="/login"
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Login
        </Link>
      </nav>

      <section className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              Manage Every Warehouse
              <span className="text-emerald-600">
                {" "}
                From One Dashboard
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600">
              Track inventory, monitor stock
              movement, manage warehouses and
              gain business insights in real-time.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700"
              >
                Get Started
              </Link>

              <button className="border border-slate-300 px-6 py-3 rounded-xl">
                Learn More
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-emerald-50">
                <h3 className="font-semibold">
                  Warehouses
                </h3>
                <p className="text-3xl font-bold mt-2">
                  12
                </p>
              </div>

              <div className="p-5 rounded-xl bg-blue-50">
                <h3 className="font-semibold">
                  Products
                </h3>
                <p className="text-3xl font-bold mt-2">
                  580
                </p>
              </div>

              <div className="p-5 rounded-xl bg-red-50">
                <h3 className="font-semibold">
                  Alerts
                </h3>
                <p className="text-3xl font-bold mt-2">
                  08
                </p>
              </div>

              <div className="p-5 rounded-xl bg-yellow-50">
                <h3 className="font-semibold">
                  Stock Value
                </h3>
                <p className="text-3xl font-bold mt-2">
                  ₹8.2M
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}