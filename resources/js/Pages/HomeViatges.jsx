import GuestLayout from '../Layouts/GuestLayout.jsx';
import CardExperience from '@/Components/CardExperience/CardExperience.jsx';

export default function HomeViatges() {
    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-8">
                Benvingut a la pàgina de viatges!
            </h1>
            <p className="text-center mt-4">
                Aquí trobaràs informació sobre els teus viatges i podràs gestionar-los.
            </p>

            <CardExperience />
        </>
    );
}

HomeViatges.layout = page => <GuestLayout children={page} />;