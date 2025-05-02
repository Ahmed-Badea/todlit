import { ReactElement } from 'react';

export interface IFeaturedIcon {
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    color: 'gray' | 'primary' | 'green' | 'yellow' | 'red',
    icon: ReactElement<'svg'>,
}