export interface IAccountBarSharedProps {
  collapsed?: boolean,
  handlers: { logout: () => void, editProfile: () => void, toggleAccountBox?: () => void },
  userName: string,
  role?: string
};

export interface IImgAccountBar {
  type?: 'img',
  imgUrl: string
};

export interface ITextAccountBar {
  type?: 'text',
  userShortName: string
};

export interface IPlaceholderAccountBar {
  type?: 'placeholder'
};

export type IAccountBar = IAccountBarSharedProps & (
  IImgAccountBar |
  ITextAccountBar |
  IPlaceholderAccountBar
)