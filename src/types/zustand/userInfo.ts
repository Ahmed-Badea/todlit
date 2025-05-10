export type TInfo = {
  logo?: string,
  firstName: string,
  lastName?: string,
  name?: string,
  shortName: string,
  profileType?: string,
};

export interface IUserInfoStore {
  userInfo: TInfo,
  setUserInfo: (newState: TInfo) => void,
  resetUserInfo: () => void
};