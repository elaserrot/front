// src/pages/Success.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Failure() {
    const navigate = useNavigate();

    useEffect(() => {
        alert("¡Pago fallido!");
        // Redirige al inicio después de 3 segundos
        setTimeout(() => navigate("/"), 3000);
    }, [navigate]);

    return <div>¡Pago fallido!</div>;
}