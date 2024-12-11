import { useState, useCallback } from "react";

export default function useToggle() {
    const [isActive, setIsActive] = useState<Record<string, boolean>>({});

    const toggle = useCallback((key: string) => {
        console.log(toggle)
        setIsActive((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const open = useCallback((key: string) => {
        setIsActive((prev) => ({ ...prev, [key]: true }));
    }, []);

    const close = useCallback((key: string) => {
        setIsActive((prev) => ({ ...prev, [key]: false }));
    }, []);

    return { isActive, toggle, open, close };
}