import styles from './card.module.scss';
import { ICardProps } from '../../types/Card';
import { ChevronRightIcon, TrashIcon, UserIcon } from '../../assets/Icons';

export const Card = ({
  leadingIcon = UserIcon,
  ctaIcon = ChevronRightIcon,
  deleteIcon = TrashIcon,
  ctaText,
  title,
  subtitle,
  status = 'approved',
  onClick,
  onDelete,
  disabled,
}: ICardProps) => {
  return (
    <div className={styles['card']}>
      {leadingIcon && (
        <div
          className={styles['card__icon-container']}
          data-card-status={status}
        >
          {leadingIcon}
        </div>
      )}

      <div className={styles['card__content']}>
        {title && <div className={styles['card__content__title']}>{title}</div>}
        {subtitle && (
          <div className={styles['card__content__title__supporting']}>
            {subtitle}
          </div>
        )}
      </div>
      <button
        className={styles['card__cta']}
        type="button"
        disabled={disabled}
      >
        {ctaText && (
          <div className={styles['card__cta__ctaText']}>{ctaText}</div>
        )}
        {deleteIcon && (
          <div
            onClick={onDelete}
            className={styles['card__cta__delete-icon']}
            data-card-disabled={disabled}
          >
            {deleteIcon}
          </div>
        )}
        {ctaIcon && (
          <div
            onClick={onClick}
            className={styles['card__cta__cta-icon']}
            data-card-disabled={disabled}
          >
            {ctaIcon}
          </div>
        )}
      </button>
    </div>
  );
};
