import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { login } from "../api/login";
import { toast } from "react-toastify";

export default function LoginPage() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        try {
            const token = await login(correo, password);
            console.log(token);

            toast.success("¡Inicio de sesión exitoso!");
            // navigate("/dashboard");
        } catch (error) {

            toast.error("Correo o contraseña incorrectos.");
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