import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { useState } from "react";


interface LoginFormProps {
    correo: string;
    password: string;
    onCorreoChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}


export default function LoginForm({ correo, password, onCorreoChange, onPasswordChange, onSubmit }: LoginFormProps) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl grid md:grid-cols-2">

            <div className="hidden md:flex flex-col items-center justify-center  to-blue-50 text-mauve-800 p-10">

                <img  
                src={logo}
                alt="Logo"
                className="w-40 h-40 object-contain"
                />

                <h1 className="text-5xl font-bold mt-8 text-center">
                    Sistema de Facturación
                </h1>

                  {/*
                <p className="mt-5 text-center text-blue-100">
                    Plataforma para la gestión de clientes,
                    productos y facturas.
                </p>*/}

            </div>



            <div className="p-12">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Iniciar Sesión
                </h2>

                <form
                    onSubmit={onSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="block mb-2 font-medium">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => onCorreoChange(e.target.value)}
                            placeholder="correo@empresa.com"
                            className="w-full h-12 border rounded-lg px-4 focus:ring-2 focus:ring-blue-600 outline-none"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 font-medium">
                            Contraseña
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => onPasswordChange(e.target.value)}
                                className="w-full h-12 border rounded-lg px-4 pr-12 focus:ring-2 focus:ring-blue-600 outline-none"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-gray-500"
                            >
                                {
                                    showPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                }
                            </button>

                        </div>

                    </div>

                    <button
                        className="w-full h-12 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition"
                    >
                        Iniciar Sesión
                    </button>

                    <p className="text-center text-gray-500 text-sm">
                        Acceso para Administradores, Cajeros y Clientes
                    </p>

                </form>

            </div>

        </div>

    );

}