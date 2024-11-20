import { Outlet } from "react-router";
import styles from './AuthLayout.module.scss';

export default function AuthLayout() {
    return (
        <div className={styles.authLayout}>
            <div className={styles.auth}>
                <div className={styles.authSection}>
                    <Outlet />
                </div>
                <div className={styles.imageSection}></div>
            </div>
        </div>
    )
}
