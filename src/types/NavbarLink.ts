import { ComponentType } from 'react';

export type NavbarChild = {
  id: number;
  label: string;
  href: string;
  icon?: ComponentType<{ size?: number }>;
};

export type NavbarLink = {
  id: number;
  label: string;
  href?: string;
  type: 'link' | 'dropdown';
  requiresAuth?: boolean;
  requiresVerification?: boolean;
  children?: NavbarChild[];
};
