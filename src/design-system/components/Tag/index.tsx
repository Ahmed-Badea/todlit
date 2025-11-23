import React from 'react';
import type {
  ICheckboxTag,
  IUserTag,
  ICountryTag,
  ITagProps,
  ITagSharedProps,
} from '../../types/tag/tag';
import { Checkbox } from '../Checkbox';
import { Xmark } from '../../assets/Icons';
import styles from './tag.module.scss';

export const Tag = (props: ITagProps) => {
  const { type = 'text', text, size = 'sm', onClose } = props as ITagSharedProps;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  const renderPrefix = () => {
    let content = null;

    if (type === 'checkbox') {

      const { ...checkboxProps } = props as ICheckboxTag;
      content = <Checkbox {...checkboxProps} size='sm' />;

    } else if (type === 'country') {

      const { country, name } = props as ICountryTag;
      content = typeof country === 'string' ?
        <img src={country} alt={name || "country image"} />
        :
        country

    } else if (type === 'user') {

      const { img, name } = props as IUserTag;
      content = typeof img === 'string' &&
        <img src={img} alt={name || "user image"} />
    }

    return content;
  };

  return (
    <div
      className={styles["tag"]}
      data-tag-size={size}
    >
      {type !== 'text' &&
        <div className={styles["tag__prefix"]}>
          {renderPrefix()}
        </div>}

      <span
        className={styles["tag__content"]}
      >
        {text}
      </span>
      {
        onClose &&
        <div className={styles["tag__close"]} onClick={handleClose}>
          {Xmark}
        </div>
      }
    </div>
  );
};
