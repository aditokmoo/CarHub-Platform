import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../features/auth/context/auth.context";
import { refreshToken } from "../features/auth/api/services/authServices";

export default function PersistLogin() {
    const [isLoading, setLoading] = useState(true);
    const { dispatch } = useAuthContext();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                const newUserAccess = await refreshToken();
                dispatch({ type: 'SET_CURRENT_USER', payload: newUserAccess.accessToken });
                dispatch({ type: 'SET_USER_ROLE', payload: newUserAccess.role });
                dispatch({ type: 'SET_USER_ID', payload: newUserAccess.userId });
            } catch (error) {
                console.log(`Token refresh failed: ${error}`);
                dispatch({ type: 'RESET_AUTH' });
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        verifyRefreshToken();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return 'Loading...';
    }

    return <Outlet />;
}