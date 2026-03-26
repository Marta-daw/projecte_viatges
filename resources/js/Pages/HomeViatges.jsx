import GuestLayout from '../Layouts/GuestLayout.jsx';
import ExperienceList from '@/Components/ExperienceList/ExperienceList.jsx';
import Hero from '@/Components/Hero/Hero.jsx';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx';

export default function HomeViatges({ llista }) {
    return (
        <>
            <Hero />
            <ExperienceList experiences={llista} />
        </>
    );
}

HomeViatges.layout = page => <GuestLayout children={page} />;

HomeViatges.layout = page => <AuthenticatedLayout children={page} />;