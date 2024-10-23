import { useState } from "react";
import { User } from "../types";

export default function useLocalStorage(key: string, defaultValue: User[]): [User[], (value: User[]) => void] {
    const [localStorageValue, setLocalStorageValue] = useState<User[]>(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error("Error accessing localStorage", error);
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = (value: User[]) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            setLocalStorageValue(value);
        } catch (error) {
            console.error("Error setting localStorage", error);
        }
    };

    return [localStorageValue, setLocalStorageStateValue];
}