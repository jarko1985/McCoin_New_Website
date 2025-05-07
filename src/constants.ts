import { CookieCategory } from './types/cookies';

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'essential',
    title: 'Essential Cookies',
    description: [
      'Allow us to remember your settings when using Bitpanda (such as privacy or language settings)',
      'Protect the platform from attacks',
      'Enable to stay logged in after you originally log in'
    ],
    required: true
  },
  {
    id: 'performance',
    title: 'Performance Cookies',
    description: [
      'Collect information about users browsing on our website to help us measure and improve our services and website performance',
      'Receive the collected data anonymously'
    ]
  },
  {
    id: 'advertisement',
    title: 'Advertisement Cookies',
    description: [
      'Provide you with adverts relevant to Bitpanda (usually provided by third parties)',
      'Manage and personalise the ads to tailor to your interests',
      'Measure the success of our marketing campaigns'
    ]
  }
];

export const COOKIE_CONSENT_KEY = 'cookie-consent';