import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./page/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./page/DashboardPage";
import ClientePage from "./page/ClientePage";
import ProductoPage from "./page/ProductoPage";
import FacturaPage from "./page/FacturaPage";
import UsuarioPage from "./page/UsuarioPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<ClientePage />} />
          <Route path="/productos" element={<ProductoPage />} />
          <Route path="/facturas" element={<FacturaPage />} />
          <Route path="/usuarios" element={<UsuarioPage />} />
        </Route>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored" />

    </BrowserRouter>



  );

}


export default App;