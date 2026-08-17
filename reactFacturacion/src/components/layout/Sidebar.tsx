import { FaHome, FaUsers, FaBoxOpen, FaFileInvoiceDollar,
         FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface MenuItem {
    name: string;
    path: string;
    icon: React.ReactNode;
    roles: string[]; // roles que pueden ver este link
}

const menuItems: MenuItem[] = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FaHome />,
        roles: ["ROLE_ADMIN", "ROLE_CAJERO", "ROLE_CLIENTE"],
    },
    {
        name: "Clientes",
        path: "/clientes",
        icon: <FaUsers />,
        roles: ["ROLE_ADMIN", "ROLE_CAJERO"],
    },
    {
        name: "Productos",
        path: "/productos",
        icon: <FaBoxOpen />,
        roles: ["ROLE_ADMIN", "ROLE_CAJERO"],
    },
    {
        name: "Facturas",
        path: "/facturas",
        icon: <FaFileInvoiceDollar />,
        roles: ["ROLE_ADMIN", "ROLE_CAJERO", "ROLE_CLIENTE"],
    },
    {
        name: "Usuarios",
        path: "/usuarios",
        icon: <FaUserShield />,
        roles: ["ROLE_ADMIN"],
    },
];

export default function Sidebar() {
    const rol = localStorage.getItem("rol");
    const itemsVisibles = menuItems.filter((item) => rol && item.roles.includes(rol));

    return (
        <aside className="w-64 min-h-screen bg-blue-950 text-white flex flex-col">

            <div className="py-10 text-center border-b border-blue-800">
                <h1 className="text-3xl font-bold leading-9">Sistema de</h1>
                <h1 className="text-3xl font-bold leading-9">Facturación</h1>
            </div>

            <nav className="flex-1 mt-6">
                {itemsVisibles.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-8 py-4 transition-all
                            ${isActive ? "bg-blue-600 border-r-4 border-white" : "hover:bg-blue-800"}`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-lg font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-blue-800 p-5">
                <button
                    className="flex items-center gap-3 hover:text-red-300 transition"
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("rol");
                        window.location.href = "/login";
                    }}
                >
                    <FaSignOutAlt size={20} />
                    <span className="text-lg">Cerrar sesión</span>
                </button>
            </div>
        </aside>
    );
}