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
                // Admin panel — warm brown palette based on variables.scss
                'admin-bg': '#EDE0CC',         // warm sand (background)
                'admin-surface': '#FFFFFF',    // White cards
                'admin-sidebar': '#3D2010',    // --dark-brown
                'admin-sidebar-hover': '#6B3A2A', // --brown-compass
                'admin-border': '#cfbfa4',     // --warm-sand-darker
                'admin-accent': '#C0634A',     // --red-needle
                'admin-accent-dark': '#6B3A2A', // --brown-compass
                'admin-header': '#3D2010',     // --dark-brown
                'admin-text': '#1C1C1C',       // --blackt-text
                'admin-text-light': '#FAF6EF', // --ivory-beige for sidbar text
                'admin-text-muted': '#7A6050', // --earth-grey
                'admin-success': '#4A7C6F',    // --traveler-green
                'admin-warning': '#F0C27F',    // --golden-amber
                'admin-danger': '#C0634A',     // --red-needle
                'admin-gold': '#8B7335',       // --medium-bronze
                'admin-warm': '#EDE4D3',       // --warm-sand
            },
        },
    },

    plugins: [forms, require('@tailwindcss/typography')],
};
