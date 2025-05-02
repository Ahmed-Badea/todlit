import { IFinalStepInfo } from "../../types/outer-layout/final-step";
import styles from "./final-step-info.module.scss";

const FinalStepInfo = ({ text, img }: IFinalStepInfo) => {
  return (
    <div className={styles['final-step-info']}>
      {img && img}
      <p className={styles['final-step-info__text']}>{text}</p>
    </div>
  )
}

export default FinalStepInfo;