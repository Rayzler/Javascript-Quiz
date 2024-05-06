import { Theme } from "../types.d";
import { useEffect, useRef } from "react";
import useThemeStore from "../hooks/useThemeStore.ts";

function ThemeSwitch() {
    const switchRef = useRef<HTMLInputElement>(null);
    const theme = useThemeStore(state => state.theme);
    const setTheme = useThemeStore(state => state.setTheme);

    useEffect(() => {
        setTheme(theme === Theme.Dark);
        switchRef.current!.checked = theme === Theme.Dark;
    }, []);

    const handleThemeChange = () => {
        setTheme(switchRef.current!.checked);
    };

    return (
        <div class={"absolute right-3 top-3 flex items-center gap-2"}>
            <span>Modo {theme === Theme.Light ? "Claro" : "Oscuro"}</span>
            <label className={"relative inline-block w-12 h-7"}>
                <input className={"opacity-0 w-0 h-0"} type="checkbox" ref={switchRef} onChange={handleThemeChange} />
                <span
                    class={`before:transition-all transition-all bg-sky-500 dark:bg-neutral-600 dark:before:translate-x-5 absolute cursor-pointer inset-0 rounded-full before:rounded-full 
                    before:absolute before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white`} />
            </label>
        </div>
    );
}

export default ThemeSwitch;