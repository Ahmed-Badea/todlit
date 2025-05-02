import { MouseEventHandler, ReactNode } from 'react';

export interface ICardProps {
  leadingIcon?: ReactNode;
  ctaIcon?: ReactNode;
  deleteIcon?: ReactNode;
  ctaText?: string;
  title: string;
  subtitle?: string;
  label?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  onDelete?: MouseEventHandler;
  status?: 'info' | 'approved' | 'pending' | 'rejected';
}
