import styles from "./alert.module.scss";
import { IAlert } from "../../types/Alert/alert";

export const Alert = ({
    type = 'normal',
    text
}: IAlert) => {
    return (
        <div className={styles['alert']} data-alert-type={type}>
            {text}
        </div>
    )
};