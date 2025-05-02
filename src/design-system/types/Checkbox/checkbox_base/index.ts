export interface IChechboxBaseInternalProps {
  hovered?: boolean,
  focused?: boolean
};

export interface IChechboxBase {
  id: string,
  size?: "sm" | "md",
  icon?: "tick" | "dash",
  checked?: boolean,
  disabled?: boolean,
  onChangeHandler?: (checked: boolean, value?: string) => void,
};