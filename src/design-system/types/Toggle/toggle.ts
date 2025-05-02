export interface IToggle {
    size?: 'sm' | 'md',
    disabled?: boolean,
    isHovered?: boolean,
    isFocused?: boolean,
    isChecked?: boolean,
    value?: string
    onChangeHandler?: (checked: boolean, value: string) => void
}
