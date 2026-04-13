import GuestLayout from '../Layouts/GuestLayout.jsx';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx';
import ExperienceList from '@/Components/ExperienceList/ExperienceList.jsx';
import Hero from '@/Components/Hero/Hero.jsx';

export default function HomeViatges({ llista }) {
    return (
        <>
            <Hero />
            <ExperienceList experiences={llista} />
        </>
    );
}

HomeViatges.layout = page => {
    const { auth } = page.props;

    return auth.user ? (
        <AuthenticatedLayout user={auth.user}>
            {page}
        </AuthenticatedLayout>
    ) : (
        <GuestLayout>
            {page}
        </GuestLayout>
    );
};
