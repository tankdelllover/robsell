import { createContext, useContext, useState } from "react";

export const AVAILABLE_YEARS = [
    2026,
    2025
];

const YearContext = createContext();

export function YearProvider({ children }) {

    const [year, setYear] = useState(AVAILABLE_YEARS[0]);

    return (
        <YearContext.Provider value={{ year, setYear }}>
            {children}
        </YearContext.Provider>
    );
}

export function useYear() {
    return useContext(YearContext);
}