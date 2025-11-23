import type { ReactElement } from 'react';
import type { ICheckboxVariant } from '../Checkbox';

export type TTagSize = 'sm' | 'md' | 'lg';
export type TTagType = 'text' | 'checkbox' | 'country' | 'user';

export interface ITagSharedProps {
  type?: TTagType,
  text: string;
  size?: TTagSize;
  onClose?: () => void;
};

export interface ITextTag {
  type?: 'text',
};

export interface ICheckboxTag extends ICheckboxVariant {
  type?: 'checkbox';
};

export interface ICountryTag {
  type?: 'country',
  name?: string,
  country: string | ReactElement<'svg'>
};

export interface IUserTag {
  type?: 'user',
  name?: string,
  img: string
};

export type ITagProps = ITagSharedProps & (
  ITextTag |
  ICheckboxTag |
  ICountryTag |
  IUserTag
);