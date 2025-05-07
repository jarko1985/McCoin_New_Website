export type CookieType = 'essential' | 'performance' | 'advertisement';
export type CookieConsent = Record<CookieType, boolean>;

export interface CookieCategory {
  id: CookieType;
  title: string;
  description: string[];
  required?: boolean;
}