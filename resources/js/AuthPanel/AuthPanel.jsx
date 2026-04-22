import FormLogin from '@/Components/FormLogin/FormLogin';
import FormRegister from '@/Components/FormRegister/FormRegister';
import style from './AuthPanel.module.scss';

export default function AuthPanel() {
    return (
        <>
            <h2 className='homeViatgesH1'>Inici de sessió i registre</h2>
            <div className="containerLoginRegister">
                <FormLogin />
                <FormRegister />
            </div>
        </>
    );
}