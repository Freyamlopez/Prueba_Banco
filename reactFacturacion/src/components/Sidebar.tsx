
import { FaHome, FaUsers, FaBoxOpen, FaFileInvoiceDollar, 
         FaUserShield, FaSignOutAlt} from "react-icons/fa";


import { NavLink } from "react-router-dom";


export default function Sidebar() {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            name: "Clientes",
            path: "/clientes",
            icon: <FaUsers />
        },

        {
            name: "Productos",
            path: "/productos",
            icon: <FaBoxOpen />
        },

        {
            name: "Facturas",
            path: "/facturas",
            icon: <FaFileInvoiceDollar />
        },

        {
            name: "Usuarios",
            path: "/usuarios",
            icon: <FaUserShield />
        }

    ];

    return (

        <aside className="w-64 min-h-screen bg-blue-950 text-white flex flex-col">
     
            <div className="py-10 text-center border-b border-blue-800">
                <h1 className="text-3xl font-bold leading-9">
                    Sistema de
                </h1>
                <h1 className="text-3xl font-bold leading-9">
                    Facturación
                </h1>
            </div>

            {/* MENU */}

            <nav className="flex-1 mt-6">
                {
                    menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-8 py-4 transition-all                  
                                ${isActive
                                    ? "bg-blue-600 border-r-4 border-white"
                                    : "hover:bg-blue-800"}`
                            }
                        >

                            <span className="text-xl">
                                {item.icon}
                            </span>

                            <span className="text-lg font-medium">
                                {item.name}
                            </span>
                        </NavLink>
                    ))
                }
            </nav>

            {/* FOOTER */}

            <div className="border-t border-blue-800 p-5">
                <button
                    className="flex items-center gap-3 hover:text-red-300 transition"
                >
                    <FaSignOutAlt size={20} />
                    <span className="text-lg">
                        Cerrar sesión
                    </span>

                </button>
            </div>
        </aside>

    );

}