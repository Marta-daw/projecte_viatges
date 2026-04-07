import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'admin-bg': '#0a0a0b',
                'admin-surface': '#1a1d20',
                'admin-border': '#333333',
                'admin-accent': '#3b82f6',
                'admin-text': '#e5e7eb',
                'admin-text-muted': '#9ca3af',
                'admin-success': '#10b981',
                'admin-warning': '#f59e0b',
                'admin-danger': '#ef4444',
            },
        },
    },

    plugins: [forms],
};
