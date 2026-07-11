import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { sidebarItems } from "../../constants/sidebar";

export default function Sidebar() {
  return (
    <aside className="h-screen w-72 border-r border-slate-200 bg-white">
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-2 px-4">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            active={item.title === "Dashboard"} // Abhi static hai, baad me React Router se dynamic karenge
          />
        ))}
      </nav>
    </aside>
  );
}