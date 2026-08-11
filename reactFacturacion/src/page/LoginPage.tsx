import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { login } from "../api/login";
import { toast } from "react-toastify";

export default function LoginPage() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


 
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {
            const data = await login(correo, password);
          //  console.log("LOGIN:", data);
            toast.success("¡Inicio de sesión exitoso!");

            if (data.rol === "ROLE_CLIENTE") {
                navigate("/mis-facturas");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
          //  console.error(error);
            toast.error("Correo o contraseña incorrectos");
        }
    };




    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <LoginForm
                correo={correo}
                password={password}
                onCorreoChange={setCorreo}
                onPasswordChange={setPassword}
                onSubmit={handleSubmit}
            />

        </div>

    );

}