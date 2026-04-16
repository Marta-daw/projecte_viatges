import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';

/**
 * Hook que escolta els missatges flash de Laravel (via Inertia shared props)
 * i els mostra automàticament com a toasts.
 * Fes-lo servir en qualsevol layout o pàgina de nivell superior.
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
