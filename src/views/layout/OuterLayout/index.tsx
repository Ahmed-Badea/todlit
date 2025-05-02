import LangSwitcher from "../../../components/LangSwitcher";
import { IOuterLayout } from "../../../types/outer-layout";
import styles from "./outer-layout.module.scss";
import TODLIT from '../../../assets/images/outerLayout/todlit-original.jpeg';

const OuterLayout = (
  { formLegend, formSubTitle, children }
    : IOuterLayout
) => {

  return (
    <div className={styles['outer-layout']}>
      <form className={styles['outer-layout__form']} onSubmit={(e) => { e.preventDefault() }}>
        <LangSwitcher layout="outer" />
        <div className={styles['outer-layout__form__header']}>
          <img className={styles['outer-layout__form__logo']} src={TODLIT} alt="TODLIT" />
          {
            formLegend &&
            <legend>
              {formLegend}
            </legend>
          }

          {
            formSubTitle &&
            <p className={styles['outer-layout__form__header__desc']}>
              {formSubTitle}
            </p>
          }
        </div>
        {children && children}
      </form>
    </div>
  )
}

export default OuterLayout;