import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  ShoppingBag,
  MessagesSquare,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium";

  const activeClass = "bg-blue-100 text-blue-600 font-semibold";
  const inactiveClass = "text-gray-700 hover:bg-gray-100 hover:text-blue-500";

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg border-r px-4 py-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <ShoppingBag size={18} />
            Products
          </NavLink>

          <NavLink
            to="/admin/gallery"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Image size={18} />
            Gallery
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <MessagesSquare size={18} />
            Inquiries
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-600 hover:text-red-700 text-sm font-medium px-4 py-2 mt-6"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
