import { useCallback, useState } from "react";

export default function useToggle() {
    const [ isActive, setIsActive ] = useState(false);

    const toggle = useCallback(() => setIsActive((prev) => !prev), []);

    return { isActive, toggle, setIsActive }
}