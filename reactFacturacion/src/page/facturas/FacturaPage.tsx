import FacturaAdminView from "./FacturaAdminView.tsx";
import FacturaCajeroView from "./FacturaCajeroView";

export default function FacturaPage() {
    const rol = localStorage.getItem("rol");

    if (rol === "ROLE_ADMIN") return <FacturaAdminView />;
    if (rol === "ROLE_CAJERO") return <FacturaCajeroView />;

    return <p className="text-slate-500">No tienes acceso a esta sección.</p>;
}