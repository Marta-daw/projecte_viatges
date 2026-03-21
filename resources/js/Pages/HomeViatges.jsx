import GuestLayout from '../Layouts/GuestLayout.jsx';
//import CardExperience from '@/Components/CardExperience/CardExperience.jsx';
import ExperienceList from '@/Components/ExperienceList/ExperienceList.jsx';

export default function HomeViatges({ llista }) {
    return (
        <>
            <h1 className="homeViatgesH1">Experiències més recents</h1>
            {/* {llista.map(item => (
                <CardExperience key={item.id} experience={item} />
            ))} */}

            <ExperienceList experiences={llista} />
        </>
    );
}

HomeViatges.layout = page => <GuestLayout children={page} />;