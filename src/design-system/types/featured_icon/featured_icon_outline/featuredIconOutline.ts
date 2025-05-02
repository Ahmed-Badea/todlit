import { ReactElement } from 'react';

export interface IFeaturedIconOutline {
    size: 'sm' | 'md' | 'lg' | 'xl',
    color: 'brand' | 'gray' | 'error' | 'warning' | 'success',
    icon: ReactElement<'svg'>,
}