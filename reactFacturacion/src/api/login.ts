
const URL = "http://localhost:8080/auth/login";



export async function login(correo: string, password: string) {

    const response = await fetch(URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo,
            password
        })

    });
    
    if (!response.ok) {
        throw new Error("Correo o contraseña incorrectos");
    }

    const token = response.headers.get("Authorization");

    return token;
}


