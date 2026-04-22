import '../css/app.css';
import './bootstrap';
import '../css/index.scss';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { createElement } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            createElement('div', null,
                createElement(Toaster, {
                    position: 'top-right',
                    richColors: true,
                    duration: 9000,
                    toastOptions: {
                        style: {
                            fontFamily: 'var(--font-secundaria, "Open Sans", sans-serif)',
                            fontSize: '1.1rem',
                            padding: '1.1rem 1.4rem',
                            minWidth: '360px',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(107, 58, 42, 0.18)',
                        },
                    },
                }),
                createElement(App, props)
            )
        );
    },
    progress: {
        color: '#C0634A',
    },
});
