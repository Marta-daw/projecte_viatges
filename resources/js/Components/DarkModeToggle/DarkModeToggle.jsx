import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Cambiar modo de color"
        >
            {isDark ? (
                <FaSun className="text-yellow-400 text-xl" />
            ) : (
                <FaMoon className="text-gray-600 text-xl" />
            )}
        </button>
    );
}