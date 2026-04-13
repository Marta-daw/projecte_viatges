import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

/**
 * Hook que escucha los mensajes flash de Laravel (via Inertia shared props)
 * y los muestra automáticamente como toasts.
 * Úsalo en cualquier layout o página top-level.
 */
export function useFlashToast() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
}
