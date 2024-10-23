import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../features/auth/context/auth.context";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
    const { state } = useAuthContext();
    const location = useLocation();
    return state.currentUser ? <Navigate to='/' state={{ from: location }} replace /> : children;
}