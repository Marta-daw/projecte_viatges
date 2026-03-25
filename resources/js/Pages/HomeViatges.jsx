import GuestLayout from '../Layouts/GuestLayout.jsx';
import ExperienceList from '@/Components/ExperienceList/ExperienceList.jsx';
import Hero from '@/Components/Hero/Hero.jsx';

export default function HomeViatges({ llista }) {
    return (
        <>
            <Hero />
            <h1 className="homeViatgesH1">Experiències més recents</h1>
            <ExperienceList experiences={llista} />
        </>
    );
}

HomeViatges.layout = page => <GuestLayout children={page} />;