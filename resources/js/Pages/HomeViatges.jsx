import GuestLayout from '../Layouts/GuestLayout.jsx';
import ExperienceList from '@/Components/ExperienceList/ExperienceList.jsx';
import FormLogin from '@/Components/FormLogin/FormLogin.jsx';
import Hero from '@/Components/Hero/Hero.jsx';
import AuthPanel from '@/AuthPanel/AuthPanel.jsx';

export default function HomeViatges({ llista }) {
    return (
        <>
            <Hero />
            <h1 className="homeViatgesH1">Experiències més recents</h1>

            <ExperienceList experiences={llista} />

            <AuthPanel />
        </>
    );
}

HomeViatges.layout = page => <GuestLayout children={page} />;