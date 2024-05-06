import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "../types.d";

interface State {
    theme: Theme,
    setTheme: (darkMode: boolean) => void;
}

const useThemeStore = create(
    persist<State>(
        (set) => ({
            theme: Theme.Dark,
            setTheme: (darkMode: boolean) => {
                set({ theme: darkMode ? Theme.Dark : Theme.Light });
                document.documentElement.style.setProperty("--color-scheme", !darkMode ? "light" : "dark");
                if (darkMode) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        }),
        {
            name: "theme"
        }
    )
);

export default useThemeStore;