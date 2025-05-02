import styles from "./label.module.scss";
import { ILabel } from "../../types/Label/label";

export const Label = ({
    text,
    hintText,
    inputName
}: ILabel) => {
    return (
        <label className={styles['label']} {...(inputName ? {htmlFor: inputName} : {})}>
            {text && text}
            {hintText && <span className={styles['label__optional']}>{hintText}</span>}
        </label>
    )
}