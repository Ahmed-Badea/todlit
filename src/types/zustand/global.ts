export type TIsAuth = boolean | 'pending';

export interface IGlobalStore {
  isAuthenticated: TIsAuth,
  setIsAuthenticated: (newState: TIsAuth) => void,
};