import styles from './progress-bar.module.scss';
import { IProgressBar } from '../../types/progress_bar/progressBar';

export const ProgressBar = ({
    totalSteps = 1,
    currentStep = 0
}: IProgressBar) => {
    return (
        <div className={styles['progress-bar-track']}>
            <div className={`${styles['progress-bar-track__bar']} ${(currentStep / totalSteps === 1) ? styles['progress-bar-track__bar--completed'] : ''}`}
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}>
            </div>
        </div>
    )
}
