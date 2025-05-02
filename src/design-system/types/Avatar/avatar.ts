export interface IAvatarSharedProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  focusable?: boolean
};

export interface IImgAvatar {
  type?: 'img',
  imgUrl: string,
  name?: string
};

export interface INameAvatar {
  type?: 'text',
  shortName: string
};

export interface IPlaceholderAvatar {
  type?: 'placeholder'
};

export type IAvatar = IAvatarSharedProps & (
  IImgAvatar |
  INameAvatar |
  IPlaceholderAvatar
)