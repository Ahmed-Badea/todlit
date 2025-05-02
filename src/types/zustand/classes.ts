export type TClass = { 
  label: { en: string, ar: string },
  value: string
};

export interface IClassesStore {
  classes: TClass[],
  setClasses: (classes: TClass[]) => void
};