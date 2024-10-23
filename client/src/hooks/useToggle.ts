import { useCallback, useState } from "react";

export default function useToggle() {
    const [ isActive, setActive ] = useState(false);

    const toggle = useCallback(() => setActive((prev) => !prev), []);

    return { isActive, toggle }
}