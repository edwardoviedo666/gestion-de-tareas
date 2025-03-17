import Image from "next/image";
import cn from 'classnames';
import styles from "./header.module.scss";
const Header = () => {
    return (
        <header className={cn(styles['header'], 'header')}>
            <p className={styles.logo}>
                <Image src="/logo.png" width={40} height={20} alt="Logo"/>
                <a className={styles.textLogo} href="https://www.mercadolibre.com.co">
                    Task Manager
                </a>
            </p>
        </header>
    );
};

export default Header;
