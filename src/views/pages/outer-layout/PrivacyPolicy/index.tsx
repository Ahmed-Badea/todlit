import { useTranslation } from 'react-i18next';
import styles from './privacy-policy.module.scss';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>{t('outerLayout.form.privacy.title')}</h1>
        <p className={styles.updated}>{t('outerLayout.form.privacy.lastUpdated')}</p>

        <section>
          <h2>1. {t('outerLayout.form.privacy.intro1').split('.')[0]}</h2>
          <p>{t('outerLayout.form.privacy.intro1')}</p>
          <p>{t('outerLayout.form.privacy.intro2')}</p>
        </section>

        <section>
          <h2>2. {t('outerLayout.form.privacy.gdprTitle')}</h2>
          <p>{t('outerLayout.form.privacy.gdpr1')}</p>
          <p>{t('outerLayout.form.privacy.gdpr2')}</p>
        </section>

        <section>
          <h2>3. {t('outerLayout.form.privacy.collectTitle')}</h2>
          <h3>3.1 {t('outerLayout.form.privacy.personalTitle')}</h3>
          <ul>
            <li>{t('outerLayout.form.privacy.personal1')}</li>
            <li>{t('outerLayout.form.privacy.personal2')}</li>
            <li>{t('outerLayout.form.privacy.personal3')}</li>
            <li>{t('outerLayout.form.privacy.personal4')}</li>
          </ul>
          <h3>3.2 {t('outerLayout.form.privacy.autoTitle')}</h3>
          <ul>
            <li>{t('outerLayout.form.privacy.auto1')}</li>
            <li>{t('outerLayout.form.privacy.auto2')}</li>
            <li>{t('outerLayout.form.privacy.auto3')}</li>
          </ul>
        </section>

        <section>
          <h2>4. {t('outerLayout.form.privacy.useTitle')}</h2>
          <p>{t('outerLayout.form.privacy.useIntro')}</p>
          <ul>
            <li>{t('outerLayout.form.privacy.use1')}</li>
            <li>{t('outerLayout.form.privacy.use2')}</li>
            <li>{t('outerLayout.form.privacy.use3')}</li>
            <li>{t('outerLayout.form.privacy.use4')}</li>
            <li>{t('outerLayout.form.privacy.use5')}</li>
            <li>{t('outerLayout.form.privacy.use6')}</li>
            <li>{t('outerLayout.form.privacy.use7')}</li>
            <li>{t('outerLayout.form.privacy.use8')}</li>
          </ul>
        </section>

        <section>
          <h2>5. {t('outerLayout.form.privacy.securityTitle')}</h2>
          <p>{t('outerLayout.form.privacy.securityIntro')}</p>
        </section>

        <section>
          <h2>6. {t('outerLayout.form.privacy.retentionTitle')}</h2>
          <p>{t('outerLayout.form.privacy.retentionIntro')}</p>
        </section>

        <section>
          <h2>7. {t('outerLayout.form.privacy.rightsTitle')}</h2>
          <p>{t('outerLayout.form.privacy.rightsIntro')}</p>
        </section>

        <section>
          <h2>8. {t('outerLayout.form.privacy.thirdPartyTitle')}</h2>
          <p>{t('outerLayout.form.privacy.thirdPartyIntro')}</p>
        </section>

        <section>
          <h2>9. {t('outerLayout.form.privacy.cookiesTitle')}</h2>
          <p>{t('outerLayout.form.privacy.cookiesIntro')}</p>
        </section>

        <section>
          <h2>10. {t('outerLayout.form.privacy.childrenTitle')}</h2>
          <p>{t('outerLayout.form.privacy.childrenContent')}</p>
        </section>

        <section>
          <h2>11. {t('outerLayout.form.privacy.transferTitle')}</h2>
          <p>{t('outerLayout.form.privacy.transferContent')}</p>
        </section>

        <section>
          <h2>12. {t('outerLayout.form.privacy.sharingTitle')}</h2>
          <p>{t('outerLayout.form.privacy.sharingIntro')}</p>
        </section>

        <section>
          <h2>13. {t('outerLayout.form.privacy.notificationsTitle')}</h2>
          <p>{t('outerLayout.form.privacy.notificationsContent')}</p>
        </section>

        <section>
          <h2>14. {t('outerLayout.form.privacy.changesTitle')}</h2>
          <p>{t('outerLayout.form.privacy.changesIntro')}</p>
        </section>

        <section>
          <h2>15. {t('outerLayout.form.privacy.contactTitle')}</h2>
          <p>{t('outerLayout.form.privacy.contactIntro')}</p>
          <p>{t('outerLayout.form.privacy.contactEmail')}</p>
        </section>

        <section>
          <h2>16. {t('outerLayout.form.privacy.complaintTitle')}</h2>
          <p>{t('outerLayout.form.privacy.complaintContent')}</p>
        </section>

        <footer className={styles.footer}>
          <p>{t('outerLayout.form.privacy.copyright')}</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
