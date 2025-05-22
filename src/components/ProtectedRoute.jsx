import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
    const { usuario } = useAuth();

    if (!usuario) return <Navigate to="/login" />;

    if (role && usuario.rol !== role) return <Navigate to="/no-autorizado" />;

    return children;
}
