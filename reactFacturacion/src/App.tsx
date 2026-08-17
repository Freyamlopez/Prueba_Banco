import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./page/auth/LoginPage";
import DashboardLayout from "./components/layout/DashboardLayout.tsx";
import DashboardPage from "./page/dashboard/DashboardPage.tsx";
import ClientePage from "./page/clientes/ClientePage.tsx";
import ProductoPage from "./page/productos/ProductoPage.tsx";
import UsuarioPage from "./page/usuarios/UsuarioPage.tsx";
import FacturaPage from "./page/facturas/FacturaPage.tsx";
import FacturasClientePage from "./page/facturas/FacturaClientePage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* nuevo */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/productos" element={<ProductoPage />} />
          <Route path="/facturas" element={<FacturaPage />} />
          <Route path="/usuarios" element={<UsuarioPage />} />
          <Route path="/productos" element={<ProductoPage />} />
        
        </Route>
        <Route path="/cliente-facturas"element={<FacturasClientePage />}/>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;