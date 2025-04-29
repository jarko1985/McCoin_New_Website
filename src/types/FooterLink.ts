export type FooterLink = {
  id: number;
  label: string;
  href: string;
  iconName?: string;
  subLinks?: FooterLink[];
};