import logo from '../../../images/LogoSinFondo.png';
import styles from './AppLogo.module.scss';

export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="Logo" className={styles.logo} loading="eager" decoding="async" />
    );
}
