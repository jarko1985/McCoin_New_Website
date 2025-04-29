import ARROW_UP from '../public/images/arrow_up.svg';
import EDUCATION from '../public/images/graduation.svg';
import VISION from '../public/images/vision.svg';
import MISSION from '../public/images/mission.svg';
import ZEROFEE from '@/../public/images/zero_fee_icon.svg';
import ULTIMATE from '@/../public/images/ultimate_icon.svg';
import SAFTEY from '@/../public/images/shield_icon.svg';
import GLOBAL from '@/../public/images/globe_icon.svg';
import FULLSTACK from '@/../public/images/full_stack_icon.svg';
import ONE from '@/../public/images/one.svg';
import TWO from '@/../public/images/two.svg';
import THREE from '@/../public/images/three.svg';
import AVATAR from '@/../public/images/avatar.svg';
import COINHAND from '@/../public/images/coins_hand.svg';
import EXPORT from '@/../public/images/export.svg';
import NEWS1 from '@/../public/images/news1_pic.png';
import NEWS2 from '@/../public/images/news2_pic.png';
import NEWS3 from '@/../public/images/news3_pic.png';
import { TbArticle } from "react-icons/tb";
import { FaBlog } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { GiSattelite } from "react-icons/gi";
import { LiaHotjar } from "react-icons/lia";
import { FaPodcast } from "react-icons/fa";
import { TiUserAddOutline } from "react-icons/ti";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { PiHandDeposit } from "react-icons/pi";
import { RiExchangeLine } from "react-icons/ri";
import { PiHandWithdraw } from "react-icons/pi";
import { LuMailQuestion } from "react-icons/lu";
import { GrContact } from "react-icons/gr";
import { FaHandsHelping } from "react-icons/fa";
import { FooterLink } from '@/types/FooterLink';


export const NAV_DATA = [
  { title: "About", href: "/about" },
  { title: "Markets", href: "/markets" },
  {
    title: "Learn",
    children: [
      { title: "Articles", icon: TbArticle, href: "/articles" },
      { title: "Blog", icon: FaBlog, href: "/blog" },
      { title: "Market Sentiment", icon: TbDeviceAnalytics, href: "/market-sentiment" },
      { title: "Crypto 101", icon: FaGraduationCap, href: "/crypto101" },
    ],
  },
  {
    title: "McCoin insider",
    children: [
      { title: "Top News", icon: ImNewspaper, href: "/top-news" },
      { title: "Newsroom", icon: GiSattelite, href: "/news-room" },
      { title: "Hot Topics", icon: LiaHotjar, href: "/hot-topics" },
      { title: "Podcasts", icon: FaPodcast, href: "/podcasts" },
    ],
  },
  {
    title: "How to",
    children: [
      { title: "Create an Account", icon: TiUserAddOutline, href: "/create-account" },
      { title: "Verify Your Identity (KYC)", icon: RiVerifiedBadgeLine, href: "/verify-identity" },
      { title: "Deposit Funds", icon: PiHandDeposit, href: "/deposit" },
      { title: "Trade Cryptocurrency", icon: RiExchangeLine, href: "/trade" },
      { title: "Withdraw Funds", icon: PiHandWithdraw, href: "/withdraw" },
    ],
  },
  {
    title: "Support center",
    children: [
      { title: "Frequently Asked Questions (FAQs)", icon: LuMailQuestion, href: "/faqs" },
      { title: "Contact Us", icon: GrContact, href: "/contact" },
      { title: "Help Topics", icon: FaHandsHelping, href: "/help-topics" },
    ],
  },
];
;

export const OurGoalsData = [
    {
      id:1,
      src:ARROW_UP,
      title:"Regulatory Compliance",
      description:"At McCoin, we prioritize regulatory compliance to ensure responsible adoption and informed decision-making within the crypto industry."
    },
    {
      id:2,
      src:EDUCATION,
      title:"Educational Initiatives",
      description:"We are committed to educating and promoting crypto awareness, engaging with the public, regulators, and authorities to expand knowledge and understanding of the cryptocurrency landscape."
    },
    {
      id:3,
      src:VISION,
      title:"Our Vision",
      description:"To be the leading fintech firm in the MENA region, setting new standards for transparency, innovation, and excellence in the cryptocurrency  industry. We envision a future where McCoin is recognized as the go-to platform for crypto trading, education, and community engagement."
    },
    {
      id:4,
      src:MISSION,
      title:"Our Mission",
      description:"Our mission is to empower individuals and businesses in the MENA region with a secure, transparent, and user-friendly crypto trading platform, built on honesty, innovation, and commitment, to exceed user expectations and foster trust."
    }
  ]




export const Faqs = [
  {
    id: "faq-1",
    question: "What is MCcoin and what services does it offer?",
    answer: "MCcoin is a cryptocurrency exchange platform that allows users to buy, sell, and trade various digital assets. We offer spot trading, futures trading, and staking services with competitive fees and advanced trading tools."
  },
  {
    id: "faq-2",
    question: "How do I create an account on MCcoin?",
    answer: "You can create an account by visiting our website or mobile app, clicking 'Sign Up', and providing your email address and creating a secure password. You'll need to complete identity verification (KYC) to access all features."
  },
  {
    id: "faq-3",
    question: "What cryptocurrencies can I trade on MCcoin?",
    answer: "MCcoin supports major cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), and many altcoins. The full list of supported coins is available in our Markets section, with new assets added regularly."
  },
  {
    id: "faq-4",
    question: "Is MCcoin regulated and licensed?",
    answer: "Yes, MCcoin operates under strict regulatory compliance. We are registered with relevant financial authorities and adhere to all required anti-money laundering (AML) and know-your-customer (KYC) regulations."
  },
  {
    id: "faq-5",
    question: "What security measures does MCcoin have to protect my funds?",
    answer: "We use industry-leading security including two-factor authentication (2FA), cold storage for 98% of user funds, encrypted data transmission, and regular security audits to ensure platform safety."
  },
  {
    id: "faq-6",
    question: "What are the trading fees on MCcoin?",
    answer: "MCcoin charges a 0.1% fee for spot trading, with discounts available for high-volume traders and those holding our native MCcoin token. Withdrawal fees vary by cryptocurrency."
  },
  {
    id: "faq-7",
    question: "How do I deposit/withdraw funds from my MCcoin account?",
    answer: "You can deposit via bank transfer, credit/debit card, or cryptocurrency transfers. Withdrawals can be made to your bank account or external crypto wallets, subject to security verification."
  },
  {
    id: "faq-8",
    question: "Does MCcoin offer customer support? How can I contact them?",
    answer: "Yes, our 24/7 customer support team can be reached via live chat, email at support@mccoin.com, or through our ticketing system. Average response time is under 30 minutes."
  },
  {
    id: "faq-9",
    question: "What trading tools and features does MCcoin provide?",
    answer: "We provide advanced charting tools, limit/stop orders, margin trading up to 10x, API access for algorithmic trading, and real-time market data to inform your trading decisions."
  },
  {
    id: "faq-10",
    question: "Does MCcoin have a mobile app for trading?",
    answer: "Yes, MCcoin offers both iOS and Android mobile apps with full trading functionality. You can download them from the App Store or Google Play Store."
  }
];

export const WhyMcCoinData = [
  {
    id:1,
    imgSRC:ZEROFEE,
    title1:"Zero Fee",
    title2:"Spot Trading",
    paragraph:"Trade freely without worrying about hidden costs. Enjoy true zero-fee spot trading on all major pairs."
  },
  {
    id:2,
    imgSRC:ULTIMATE,
    title1:"The Ultimate",
    title2:"Option Wizard",
    paragraph:"Master the markets with advanced options trading tools designed for precision and flexibility."
  },
  {
    id:3,
    imgSRC:SAFTEY,
    title1:"Safety",
    title2:"Comes Standard",
    paragraph:"From multi-layer encryption to cold storage, McCoin keeps your assets protected—always."
  },
  {
    id:4,
    imgSRC:GLOBAL,
    title1:"Global",
    title2:"Market Access",
    paragraph:"Trade on a platform that connects you to crypto markets around the world, anytime, anywhere."
  },
  {
    id:5,
    imgSRC:FULLSTACK,
    title1:"Full-Stack ",
    title2:"Infrastructure",
    paragraph:"Built with a robust backend and blazing-fast performance to support every trading move you make."
  }

];

export const StepsData = [
  {
    id:1,
    imgSRC:ONE,
    iconSRC:AVATAR,
    title:"Create Account",
    subTitle:"Create and verify your account in minutes."
  },
  {
    id:2,
    imgSRC:TWO,
    iconSRC:COINHAND,
    title:"Fund Your Account",
    subTitle:"Use Bitcoin, Ethereum, or USDC to fund your account."
  },
  {
    id:3,
    imgSRC:THREE,
    iconSRC:EXPORT,
    title:"Start Trading",
    subTitle:"Use all our advanced strategy tools to get the most of your trades."
  }
];

export const NewsData = [
  {
    id:1,
    imgSRC:NEWS1,
    category:"Marketing",
    difficutly:"Easy",
    title:"The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:"CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author:"By Warner Vermaak",
    date:"2h ago",
    ret:"4m"
  },
  {
    id:2,
    imgSRC:NEWS2,
    category:"Crypto News",
    difficutly:"Moderate",
    title:"The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:"CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author:"By Warner Vermaak",
    date:"2h ago",
    ret:"4m"
  },
  {
    id:3,
    imgSRC:NEWS3,
    category:"Crypto News",
    difficutly:"Hard",
    title:"The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:"CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author:"By Warner Vermaak",
    date:"2h ago",
    ret:"4m"
  },
  {
    id:4,
    imgSRC:NEWS1,
    category:"Marketing",
    difficutly:"Begginer",
    title:"The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:"CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author:"By Warner Vermaak",
    date:"2h ago",
    ret:"4m"
  },
]

export const PopularPostsData = [
  {
    id: 1,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin.jpg')]"
  },
  {
      id: 2,
      title: "Underwhelming Conference",
      description: "Cuts Ripple Price",
      date: "26 APRIL 2017",
      category: "Market News",
      bg: "bg-[url('/images/bitcoin2.jpg')]"
    },
    {
      id: 3,
      title: "Underwhelming Conference",
      description: "Cuts Ripple Price",
      date: "26 APRIL 2017",
      category: "Market News",
      bg: "bg-[url('/images/bitcoin3.jpg')]"
    },
    {
      id: 4,
      title: "Underwhelming Conference",
      description: "Cuts Ripple Price",
      date: "26 APRIL 2017",
      category: "Market News",
      bg: "bg-[url('/images/bitcoin4.jpg')]"
    },
    {
      id: 5,
      title: "Underwhelming Conference",
      description: "Cuts Ripple Price",
      date: "26 APRIL 2017",
      category: "Market News",
      bg: "bg-[url('/images/bitcoin5.jpg')]"
    },
    {
      id: 6,
      title: "Underwhelming Conference",
      description: "Cuts Ripple Price",
      date: "26 APRIL 2017",
      category: "Market News",
      bg: "bg-[url('/images/bitcoin6.jpg')]"
    },
    {
      id: 7,
      title: "Underwhelming Conference",
      description: "Cuts Ripple Price",
      date: "26 APRIL 2017",
      category: "Market News",
      bg: "bg-[url('/images/bitcoin7.jpg')]"
    },
    {
      id: 8,
      title: "Underwhelming Conference",
      description: "Cuts Ripple Price",
      date: "26 APRIL 2017",
      category: "Market News",
      bg: "bg-[url('/images/bitcoin8.jpg')]"
    },
];

export const dummyEvents = [
  {
    id: 1,
    title: "Blockchain Expo, London",
    startDate: new Date(2018, 3, 12), // April 12, 2018
    endDate: new Date(2018, 4, 10),   // May 10, 2018
    venue: "LONDON",
    price: "Free",
    description: "Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Donec sit amet eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris fermentum dictum magna. Sed laoreet aliquam leo. Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus.",
    imageUrl: "/images/event1.jpg"
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    startDate: new Date(2024, 5, 5),  // June 5, 2024
    endDate: new Date(2024, 5, 7),    // June 7, 2024
    venue: "SAN FRANCISCO",
    price: "Free",
    description: "Explore the latest in technology innovation with industry leaders. This summit brings together the brightest minds in tech to discuss emerging trends and future directions.",
    imageUrl: "/images/event2.jpg"
  },
  {
    id: 3,
    title: "Digital Marketing Conference",
    startDate: new Date(2024, 6, 15),  // July 15, 2024
    endDate: new Date(2024, 6, 17),    // July 17, 2024
    venue: "NEW YORK",
    price: "By Invite",
    description: "Learn cutting-edge digital marketing strategies from top experts in the field. Perfect for marketers looking to stay ahead of the curve.",
    imageUrl: "/images/event3.jpg"
  }
];
export const FooterLinks: FooterLink[] = [
  {
    id: 1,
    label: "Learn",
    href: "learn",
    iconName: "BookOpen",
    subLinks: [
      { id: 31, label: "Articles", href: "articles", iconName: "FileText" },
      { id: 32, label: "Blog", href: "blog", iconName: "Bookmark" },
      { id: 33, label: "Market-Sentiment", href: "market-sentiment", iconName: "Briefcase" },
      { id: 34, label: "Crypto101", href: "crypto101", iconName: "Home" }
    ]
  },
  {
    id: 2,
    label: "Insider",
    href: "insider",
    iconName: "User",
    subLinks: [
      { id: 41, label: "Top-news", href: "top-news", iconName: "Newspaper" },
      { id: 42, label: "Newsroom", href: "newsroom", iconName: "MessageSquare" },
      { id: 43, label: "Hot-Topics", href: "hot-topics", iconName: "TrendingUp" },
      { id: 44, label: "Podcasts", href: "podcasts", iconName: "Podcast" }
    ]
  },
  {
    id: 3,
    label: "How to",
    href: "how-to",
    iconName: "Settings",
    subLinks: [
      { id: 51, label: "Create-an-Account", href: "create-an-account", iconName: "PlusCircle" },
      { id: 52, label: "Verify-your-Account(KYC)", href: "verify-your-account", iconName: "User" },
      { id: 53, label: "Deposit-Funds", href: "deposit-funds", iconName: "Wallet" },
      { id: 54, label: "Withdraw-Funds", href: "withdraw-funds", iconName: "Wallet" },
      { id: 55, label: "Trade-Cryptocurrency", href: "trade-cryptocurrency", iconName: "TrendingUp" }
    ]
  },
  {
    id: 4,
    label: "Support",
    href: "support",
    iconName: "CircleHelp",
    subLinks: [
      { id: 61, label: "Frequently-asked-questions(FAQ)", href: "faq", iconName: "FileText" },
      { id: 62, label: "Contact-us", href: "contact-us", iconName: "Mail" },
      { id: 63, label: "Help-Topics", href: "help-topics", iconName: "CircleHelp" }
    ]
  },
  {
    id: 5,
    label: "Resources",
    href: "resources",
    iconName: "Info",
    subLinks: [
      { id: 64, label: "Privacy Policy", href: "privacy-policy", iconName: "FileText" },
      { id: 65, label: "Terms & Conditions", href: "terms", iconName: "Mail" },
      { id: 66, label: "Disclosure", href: "disclosure", iconName: "CircleHelp" },
      { id: 66, label: "Virtual Assets Standard Policy", href: "virtual-assets", iconName: "CircleHelp" },
      { id: 66, label: "Others", href: "others", iconName: "CircleHelp" }
    ]
  },
];