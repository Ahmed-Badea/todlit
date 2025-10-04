import { type KeyboardEvent, type ChangeEventHandler, useState, forwardRef } from 'react';
import type { ITagsInput } from '../../types/Input/input';
import { Tag } from '../Tag';
import { Button } from '../Button';
import { Plus } from '../../assets/Icons';
import styles from './input.module.scss';

export const TagsInput = forwardRef<HTMLInputElement, ITagsInput>((props, ref) => {
  const {
    tags = [],
    onTagAdd,
    onTagRemove,
    tagValidator,
    maxTags,
    allowDuplicates = false,
    tagDelimiters = [',', 'Enter', ' '],
    placeholder,
    disabled,
    showAddButton = false,
    addButtonIcon = Plus,
    value,
    onChange,
    ...inputProps
  } = props;

  const [inputValue, setInputValue] = useState(value || '');

  const isTagValid = (tag: string) => {
    const trimmedTag = tag.trim();

    const hasValue = !!trimmedTag;
    const isWithinTagsLimit = !maxTags || tags.length < maxTags;
    const isUnique = allowDuplicates || !tags.includes(trimmedTag);
    const isCustomValidationPassed = !tagValidator || tagValidator(trimmedTag);

    return hasValue && isWithinTagsLimit && isUnique && isCustomValidationPassed;
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    onTagAdd?.(trimmedTag);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    const lastChar = newValue[newValue.length - 1];

    if (tagDelimiters.includes(lastChar)) {
      const newTag = newValue.slice(0, -1);
      if (isTagValid(newTag)) {
        addTag(newTag);
        setInputValue('');
        onChange?.({ ...e, target: { ...e.target, value: '' } });
        return;
      }
    }
    
    setInputValue(newValue);
    onChange?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isTagValid(inputValue)) {
        addTag(inputValue);
        setInputValue('');
        onChange?.({ ...e, target: { value: '' } } as any);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      const lastTag = tags[tags.length - 1];
      onTagRemove?.(lastTag);
    }
  };

  const handleAddButtonClick = () => {
    if (isTagValid(inputValue)) {
      addTag(inputValue);
      setInputValue('');
      onChange?.({ target: { value: '' } } as any);
    }
  };

  return (
    <div className={styles['container__wrapper__tags']}>
      {tags.map((tag, index) => (
        <Tag
          key={`${tag}-${index}`}
          type='text'
          size="sm"
          text={tag}
          onClose={() => onTagRemove?.(tag)}
        />
      ))}
      <input
        {...inputProps}
        ref={ref}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        disabled={disabled}
        className={styles['container__wrapper__tags__input']}
      />
      {showAddButton && (
        <Button
          size="sm"
          color="primary"
          variant="contained"
          leadingIcon={addButtonIcon}
          onClickHandler={handleAddButtonClick}
        />
      )}
    </div>
  );
}); 