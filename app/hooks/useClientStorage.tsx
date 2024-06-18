import { useEffect, useState, Dispatch, SetStateAction } from 'react';

const useClientStorage = <T,>(key: string, defaultValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            const savedValue = localStorage.getItem(key);
            return savedValue !== null ? JSON.parse(savedValue) : defaultValue;
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(storedValue));
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};

export default useClientStorage;
