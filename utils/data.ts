import ARROW_UP from "../public/images/arrow_up.svg";
import EDUCATION from "../public/images/graduation.svg";
import VISION from "../public/images/vision.svg";
import MISSION from "../public/images/mission.svg";
import ZEROFEE from "@/../public/images/zero_fee_icon.svg";
import ULTIMATE from "@/../public/images/ultimate_icon.svg";
import SAFTEY from "@/../public/images/shield_icon.svg";
import GLOBAL from "@/../public/images/globe_icon.svg";
import FULLSTACK from "@/../public/images/full_stack_icon.svg";
import ONE from "@/../public/images/one.svg";
import TWO from "@/../public/images/two.svg";
import THREE from "@/../public/images/three.svg";
import AVATAR from "@/../public/images/avatar.svg";
import COINHAND from "@/../public/images/coins_hand.svg";
import EXPORT from "@/../public/images/export.svg";
import NEWS1 from "@/../public/images/news1_pic.png";
import NEWS2 from "@/../public/images/news2_pic.png";
import NEWS3 from "@/../public/images/news3_pic.png";
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
import { FaHandsHelping, FaLandmark } from "react-icons/fa";
import { FooterLink } from "@/types/FooterLink";
import { MdOutlineExplore } from "react-icons/md";
export type PolicySubsection = {
  title?: string; // Now optional
  bullets: string[];
};

export type PrivacyPolicyItem = {
  id: number;
  title: string;
  description: string;
  sections: PolicySubsection[];
  summary?: string;
};

export const NAV_DATA = [
  { title: "About", href: "/about" },
  {
    title: "Markets",
    children: [
      { title: "Overview", icon: FaLandmark, href: "/market-overview" },
      {
        title: "Market Explorer",
        icon: MdOutlineExplore,
        href: "/market-explorer",
      },
    ],
  },
  {
    title: "Learn",
    children: [
      { title: "Articles", icon: TbArticle, href: "/articles" },
      { title: "Blog", icon: FaBlog, href: "/blog" },
      {
        title: "Market Sentiment",
        icon: TbDeviceAnalytics,
        href: "/market-sentiment",
      },
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
      {
        title: "Create an Account",
        icon: TiUserAddOutline,
        href: "/create-account",
      },
      {
        title: "Verify Your Identity (KYC)",
        icon: RiVerifiedBadgeLine,
        href: "/verify-identity",
      },
      { title: "Deposit Funds", icon: PiHandDeposit, href: "/deposit" },
      { title: "Trade Cryptocurrency", icon: RiExchangeLine, href: "/trade" },
      { title: "Withdraw Funds", icon: PiHandWithdraw, href: "/withdraw" },
    ],
  },
  {
    title: "Support center",
    children: [
      {
        title: "Frequently Asked Questions (FAQs)",
        icon: LuMailQuestion,
        href: "/faqs",
      },
      { title: "Contact Us", icon: GrContact, href: "/contact" },
      { title: "Help Topics", icon: FaHandsHelping, href: "/help-topics" },
    ],
  },
];
export const OurGoalsData = [
  {
    id: 1,
    src: ARROW_UP,
    title: "Regulatory Compliance",
    description:
      "At McCoin, we prioritize regulatory compliance to ensure responsible adoption and informed decision-making within the crypto industry.",
  },
  {
    id: 2,
    src: EDUCATION,
    title: "Educational Initiatives",
    description:
      "We are committed to educating and promoting crypto awareness, engaging with the public, regulators, and authorities to expand knowledge and understanding of the cryptocurrency landscape.",
  },
  {
    id: 3,
    src: VISION,
    title: "Our Vision",
    description:
      "To be the leading fintech firm in the MENA region, setting new standards for transparency, innovation, and excellence in the cryptocurrency  industry. We envision a future where McCoin is recognized as the go-to platform for crypto trading, education, and community engagement.",
  },
  {
    id: 4,
    src: MISSION,
    title: "Our Mission",
    description:
      "Our mission is to empower individuals and businesses in the MENA region with a secure, transparent, and user-friendly crypto trading platform, built on honesty, innovation, and commitment, to exceed user expectations and foster trust.",
  },
];

export const Faqs = [
  {
    id: "faq-1",
    question: "What is MCcoin and what services does it offer?",
    answer:
      "MCcoin is a cryptocurrency exchange platform that allows users to buy, sell, and trade various digital assets. We offer spot trading, futures trading, and staking services with competitive fees and advanced trading tools.",
  },
  {
    id: "faq-2",
    question: "How do I create an account on MCcoin?",
    answer:
      "You can create an account by visiting our website or mobile app, clicking 'Sign Up', and providing your email address and creating a secure password. You'll need to complete identity verification (KYC) to access all features.",
  },
  {
    id: "faq-3",
    question: "What cryptocurrencies can I trade on MCcoin?",
    answer:
      "MCcoin supports major cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), and many altcoins. The full list of supported coins is available in our Markets section, with new assets added regularly.",
  },
  {
    id: "faq-4",
    question: "Is MCcoin regulated and licensed?",
    answer:
      "Yes, MCcoin operates under strict regulatory compliance. We are registered with relevant financial authorities and adhere to all required anti-money laundering (AML) and know-your-customer (KYC) regulations.",
  },
  {
    id: "faq-5",
    question: "What security measures does MCcoin have to protect my funds?",
    answer:
      "We use industry-leading security including two-factor authentication (2FA), cold storage for 98% of user funds, encrypted data transmission, and regular security audits to ensure platform safety.",
  },
  {
    id: "faq-6",
    question: "What are the trading fees on MCcoin?",
    answer:
      "MCcoin charges a 0.1% fee for spot trading, with discounts available for high-volume traders and those holding our native MCcoin token. Withdrawal fees vary by cryptocurrency.",
  },
  {
    id: "faq-7",
    question: "How do I deposit/withdraw funds from my MCcoin account?",
    answer:
      "You can deposit via bank transfer, credit/debit card, or cryptocurrency transfers. Withdrawals can be made to your bank account or external crypto wallets, subject to security verification.",
  },
  {
    id: "faq-8",
    question: "Does MCcoin offer customer support? How can I contact them?",
    answer:
      "Yes, our 24/7 customer support team can be reached via live chat, email at support@mccoin.com, or through our ticketing system. Average response time is under 30 minutes.",
  },
  {
    id: "faq-9",
    question: "What trading tools and features does MCcoin provide?",
    answer:
      "We provide advanced charting tools, limit/stop orders, margin trading up to 10x, API access for algorithmic trading, and real-time market data to inform your trading decisions.",
  },
  {
    id: "faq-10",
    question: "Does MCcoin have a mobile app for trading?",
    answer:
      "Yes, MCcoin offers both iOS and Android mobile apps with full trading functionality. You can download them from the App Store or Google Play Store.",
  },
];

export const WhyMcCoinData = [
  {
    id: 1,
    imgSRC: ZEROFEE,
    title1: "Zero Fee",
    title2: "Spot Trading",
    paragraph:
      "Trade freely without worrying about hidden costs. Enjoy true zero-fee spot trading on all major pairs.",
  },
  {
    id: 2,
    imgSRC: ULTIMATE,
    title1: "The Ultimate",
    title2: "Option Wizard",
    paragraph:
      "Master the markets with advanced options trading tools designed for precision and flexibility.",
  },
  {
    id: 3,
    imgSRC: SAFTEY,
    title1: "Safety",
    title2: "Comes Standard",
    paragraph:
      "From multi-layer encryption to cold storage, McCoin keeps your assets protected—always.",
  },
  {
    id: 4,
    imgSRC: GLOBAL,
    title1: "Global",
    title2: "Market Access",
    paragraph:
      "Trade on a platform that connects you to crypto markets around the world, anytime, anywhere.",
  },
  {
    id: 5,
    imgSRC: FULLSTACK,
    title1: "Full-Stack ",
    title2: "Infrastructure",
    paragraph:
      "Built with a robust backend and blazing-fast performance to support every trading move you make.",
  },
];

export const StepsData = [
  {
    id: 1,
    imgSRC: ONE,
    iconSRC: AVATAR,
    title: "Create Account",
    subTitle: "Create and verify your account in minutes.",
  },
  {
    id: 2,
    imgSRC: TWO,
    iconSRC: COINHAND,
    title: "Fund Your Account",
    subTitle: "Use Bitcoin, Ethereum, or USDC to fund your account.",
  },
  {
    id: 3,
    imgSRC: THREE,
    iconSRC: EXPORT,
    title: "Start Trading",
    subTitle:
      "Use all our advanced strategy tools to get the most of your trades.",
  },
];

export const NewsData = [
  {
    id: 1,
    imgSRC: NEWS1,
    category: "Marketing",
    difficutly: "Easy",
    title: "The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:
      "CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author: "By Warner Vermaak",
    date: "2h ago",
    ret: "4m",
  },
  {
    id: 2,
    imgSRC: NEWS2,
    category: "Crypto News",
    difficutly: "Moderate",
    title: "The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:
      "CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author: "By Warner Vermaak",
    date: "2h ago",
    ret: "4m",
  },
  {
    id: 3,
    imgSRC: NEWS3,
    category: "Crypto News",
    difficutly: "Hard",
    title: "The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:
      "CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author: "By Warner Vermaak",
    date: "2h ago",
    ret: "4m",
  },
  {
    id: 4,
    imgSRC: NEWS1,
    category: "Marketing",
    difficutly: "Begginer",
    title: "The Future's Virtual: CoinMarketCap's Crypto Awards Are Here!",
    description:
      "CoinMarketCap is launching its first online Crypto Awards event in March to celebrate innovation and achievement across the crypto industry in an inclusive, global way.",
    author: "By Warner Vermaak",
    date: "2h ago",
    ret: "4m",
  },
];

export const PopularPostsData = [
  {
    id: 1,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin.jpg')]",
  },
  {
    id: 2,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin2.jpg')]",
  },
  {
    id: 3,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin3.jpg')]",
  },
  {
    id: 4,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin4.jpg')]",
  },
  {
    id: 5,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin5.jpg')]",
  },
  {
    id: 6,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin6.jpg')]",
  },
  {
    id: 7,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin7.jpg')]",
  },
  {
    id: 8,
    title: "Underwhelming Conference",
    description: "Cuts Ripple Price",
    date: "26 APRIL 2017",
    category: "Market News",
    bg: "bg-[url('/images/bitcoin8.jpg')]",
  },
];

export const dummyEvents = [
  {
    id: 1,
    title: "Blockchain Expo, London",
    startDate: new Date(2018, 3, 12), // April 12, 2018
    endDate: new Date(2018, 4, 10), // May 10, 2018
    venue: "LONDON",
    price: "Free",
    description:
      "Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Donec sit amet eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Mauris fermentum dictum magna. Sed laoreet aliquam leo. Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis. Integer rutrum ante eu lacus.",
    imageUrl: "/images/event1.jpg",
  },
  {
    id: 2,
    title: "Tech Innovation Summit",
    startDate: new Date(2024, 5, 5), // June 5, 2024
    endDate: new Date(2024, 5, 7), // June 7, 2024
    venue: "SAN FRANCISCO",
    price: "Free",
    description:
      "Explore the latest in technology innovation with industry leaders. This summit brings together the brightest minds in tech to discuss emerging trends and future directions.",
    imageUrl: "/images/event2.jpg",
  },
  {
    id: 3,
    title: "Digital Marketing Conference",
    startDate: new Date(2024, 6, 15), // July 15, 2024
    endDate: new Date(2024, 6, 17), // July 17, 2024
    venue: "NEW YORK",
    price: "By Invite",
    description:
      "Learn cutting-edge digital marketing strategies from top experts in the field. Perfect for marketers looking to stay ahead of the curve.",
    imageUrl: "/images/event3.jpg",
  },
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
      {
        id: 33,
        label: "Market-Sentiment",
        href: "market-sentiment",
        iconName: "Briefcase",
      },
      { id: 34, label: "Crypto101", href: "crypto101", iconName: "Home" },
    ],
  },
  {
    id: 2,
    label: "Insider",
    href: "insider",
    iconName: "User",
    subLinks: [
      { id: 41, label: "Top-news", href: "top-news", iconName: "Newspaper" },
      {
        id: 42,
        label: "Newsroom",
        href: "newsroom",
        iconName: "MessageSquare",
      },
      {
        id: 43,
        label: "Hot-Topics",
        href: "hot-topics",
        iconName: "TrendingUp",
      },
      { id: 44, label: "Podcasts", href: "podcasts", iconName: "Podcast" },
    ],
  },
  {
    id: 3,
    label: "How to",
    href: "how-to",
    iconName: "Settings",
    subLinks: [
      {
        id: 51,
        label: "Create-an-Account",
        href: "create-an-account",
        iconName: "PlusCircle",
      },
      {
        id: 52,
        label: "Verify-your-Account(KYC)",
        href: "verify-your-account",
        iconName: "User",
      },
      {
        id: 53,
        label: "Deposit-Funds",
        href: "deposit-funds",
        iconName: "Wallet",
      },
      {
        id: 54,
        label: "Withdraw-Funds",
        href: "withdraw-funds",
        iconName: "Wallet",
      },
      {
        id: 55,
        label: "Trade-Cryptocurrency",
        href: "trade-cryptocurrency",
        iconName: "TrendingUp",
      },
    ],
  },
  {
    id: 4,
    label: "Support",
    href: "support",
    iconName: "CircleHelp",
    subLinks: [
      {
        id: 61,
        label: "Frequently-asked-questions(FAQ)",
        href: "faq",
        iconName: "FileText",
      },
      { id: 62, label: "Contact-us", href: "contact-us", iconName: "Mail" },
      {
        id: 63,
        label: "Help-Topics",
        href: "help-topics",
        iconName: "CircleHelp",
      },
    ],
  },
  {
    id: 5,
    label: "Resources",
    href: "resources",
    iconName: "Info",
    subLinks: [
      {
        id: 64,
        label: "Privacy Policy",
        href: "privacy-policy",
        iconName: "FileText",
      },
      { id: 65, label: "Terms & Conditions", href: "terms-and-conditions", iconName: "Mail" },
      {
        id: 66,
        label: "Disclosure",
        href: "risk-disclosure",
        iconName: "CircleHelp",
      },
      {
        id: 66,
        label: "Virtual Assets Standard Policy",
        href: "virtual-assets",
        iconName: "CircleHelp",
      },
      { id: 66, label: "Others", href: "others", iconName: "CircleHelp" },
    ],
  },
];

export const riskDisclosureData = [
  {
    id: 1,
    title: "I.General risks",
    description: `
      <p>This Risk Disclosure Statement outlines a non-exhaustive list of risks which may be associated with the Services we offer, relating in particular to entering into Transactions. In this Risk Disclosure Statement, references to "MCCOIN" or "we", "us" or "our" means MCCOIN Virtual Assets L.L.C.</p>
      
      <p>This Risk Disclosure Statement does not set out all risks arising in relation to the Investments and Services we may offer, and should not be relied upon as doing so. The risks applicable to any particular Investment or Service will depend on your particular circumstances and the terms of the relevant transaction. You should not deal in any Investment unless you understand the nature of the product you are dealing in (or a contract you are entering into), the extent of your exposure to risk, and unless you are satisfied that the product is appropriate for you.</p>
      
      <p>You should consider carefully whether or not any product is suitable for you in light of your circumstances and financial position, and if in any doubt, seek professional advice.</p>
      
      <p>All financial products carry a degree of risk and even low-risk investment strategies contain an element of uncertainty. Prices may fluctuate and there is a risk you may lose some or all of your investment, and in some cases, more than the amount equal to your entire original investment. The types of risk that might be of concern will depend on various matters. The specific risks of a particular product will depend upon the nature of the asset and the circumstances of the relevant parties involved.</p>
      
      <p>The nature and extent of investment risks varies with, amongst other things, the type of investment, the diversification or concentration in a portfolio and the complexity of the transaction. The price or value of an investment will depend on fluctuations in the financial markets and current performance, past performance, stimulated past performance or forecast performance are no indicator of future performance.</p>
      
      <p>Types of risks that may have an impact on your investment include (without limitation) liquidity risk, market risk (including volatility risk and the impact of market conditions), settlement risk, currency risk, credit risk, operational risk, business risk, tax risk, regulatory risk, legal risk, barriers to or restrictions on divestment, risks inherent in "over the counter trading" and/or risks as a result of you assuming additional obligations in relation to the investment. These risks may occur simultaneously and may have an unpredictable effect on the value of your investment. The types of risks outlined in this Risk Disclosure Statement are not an exhaustive list of the risks which may occur in relation to Investments and you should consider any and all additional material provided to you in connection with your investment when assessing your risk exposure.</p>
      
      <p>Risks arising generally in relation to Investments include:</p>
      
      <ol type="a">
        <li>
          <strong>a.   Risk relating to market conditions:</strong> the price of an Investment and its disinvestment risk may each be affected by factors relating to wider market conditions, both positive and negative, and such market conditions will affect each Investment differently.
        </li>
        <li>
          <strong>b.   Disinvestment risk:</strong> Investments may be affected by impediments to disinvestment, (e.g., Investments may prove illiquid or difficult to sell and/or may be difficult to sell at a price equal to or greater than the transaction price at the point in time that you wish to sell).
        </li>
      </ol>
    `,
  },
  {
    id: 2,
    title: "II.Over-the-counter-transactions",
    description: `<p>The Transactions you enter with us will be over-the-counter transactions and therefore will be off-exchange. 
    There are different levels of liquidity in the over-the-counter markets for specific instruments, and while some markets are highly liquid, 
    transactions in off- exchange, over-the-counter transactions may involve
    greater risk than investing in on-exchange transactions due to low liquidity as there is no exchange market on which to close out an open position. 
    It may be difficult and, in some cases, impossible to liquidate in full or in part an existing position or assess the value of the position arising 
    from an off-exchange transaction or to assess the exposure to risk associated with holding or liquidating the position. In over-the-counter markets, 
    offer and bid prices need not be quoted, and even where they are, they will be established by dealers in these instruments and consequently 
    it may be difficult to establish what is a fair price or valuation for a specific instrument.</p>`,
  },
  {
    id: 3,
    title: "III.Default and termination",
    description: `<p>If any Event of Default occurs in relation to you, or at any time after we have determined, 
    in our sole and absolute discretion, that you have not performed (or we reasonably believe that you will not be 
    able or willing in the future to perform) any of your obligations to us, we shall be entitled without prior 
    notice to you (i) to close out, terminate, accelerate, cancel, replace or reverse any Transaction, buy, sell, 
    borrow or lend any Investment or enter into any other Transaction or take, or refrain from taking, such other action 
    at such time or times and in such manner as we consider (at our discretion) necessary or appropriate to cover, 
    reduce or eliminate our loss or liability under or in respect of any of your Transactions, contracts, positions or 
    commitments, including refraining from delivering any Investments due to you and/or (ii) terminate any Transaction 
    and to terminate the Terms of Business immediately. A termination may involve the payment of a Termination Amount from you, 
    which may be netted and/or set-off against other payment obligations due between us and you.</p>`,
  },
  {
    id: 4,
    title: "IV.Disruption Events",
    description: `<p>If a Disruption Event occurs we may, in our sole and absolute discretion, make such changes, conversions, 
    adjustments or modifications to the exercise, settlement, payment or any other terms of such Transaction as we determine to be 
    appropriate (which may include cancelling any relevant Transaction and calculating any payment due to or from you based on the 
    closing prices we reasonably deem to be appropriate). We make no assurances in relation to the nature of any adjustments we decide to make.</p>`,
  },
  {
    id: 5,
    title: "V.Collateral",
    description: `<p>You may be required to transfer Collateral to us on demand, in such amounts and types as we may require in our absolute discretion, which may be in the form of cash or Digital Assets as specified by us prior to the entry into a Transaction and from time to time during the term of a Transaction. Collateral may be required in relation to any Transaction, whether entered under the Terms of Business or any Trading Agreement.</p>
<p>We reserve the right to vary the amount and type of Collateral required at our sole and absolute discretion. You are responsible for ensuring arrangements are in place to deal at all times with calls for further and/or replacement Collateral to be transferred, including sourcing Collateral of the type we require to be delivered (in the event you do not already hold such Collateral at the relevant time).</p>
<p>Any Collateral which is paid or delivered to us will be by way of outright transfer of ownership and will not be held by us in an account on your behalf and our only obligation to you in relation to such Collateral will be a contractual obligation to return an equivalent amount or asset if we decide such Collateral is no longer required. As such, you will not enjoy the same protections in relation to the Collateral that you would otherwise have enjoyed had the Collateral been placed in an account held with a third party. This creates the risk that, in the event we were subject to insolvency proceedings, you may not recover some or all of any Collateral that we were due to return to you.</p>
<p>Allowing for only the partial collateralisation of a position (for example, in relation to contracts for difference) creates leverage and this can work for you or against you. A small price movement in your favour can result in a high return on the Collateral transferred to us in relation to the contract for difference but conversely a small price movement against you may result in substantial losses.</p>`,
  },
  {
    id: 6,
    title: "VI.Foreign currency risks",
    description: `<p>Entering into Transactions involving foreign exchange exposes you to the risk of adverse changes in foreign currency exchange rates. 
    Foreign currency exchange rates can be volatile and are driven by a variety of factors relating to the economics of the territories whose currencies are being traded. 
    A movement in foreign currency exchange rates may have a favourable or an unfavourable effect on the gain or loss achieved on such Transactions. 
    The profit or loss on Transactions in foreign currency-denominated contracts (whether they are traded in your own or another jurisdiction) 
    may be affected by fluctuations in currency exchange rates where there is a need due to the nature of the instrument or otherwise to conduct 
    conversion from the currency denomination of the contract to another currency. If you enter into Transactions involving foreign exchange, 
    you are exposed to the risk that exchange rates may significantly change (including changes due to devaluation of one of the underlying currencies) 
    and the risk that the relevant authorities with jurisdiction over one of the underlying currencies may impose or modify certain exchange controls. 
    Government and monetary authorities may impose (as some have done in the past) exchange controls that could adversely affect an applicable exchange rate.</p>`,
  },
  {
    id: 7,
    title: "VII.Digital Assets risks",
    description: ` <p>The nascent nature of Digital Assets presents unique risks that investors should carefully consider:</p>
      <br/>
      <ol type="a">
        <li>
          <strong>a.The nascent nature of Digital Assets:</strong> Digital Assets are a new and evolving asset class and are part of a new and rapidly evolving industry 
          that is subject to a high degree of uncertainty. The characteristics of particular Digital Assets within the "class" may differ significantly, 
          and the investment characteristics of Digital Assets as an asset class differ from those of traditional currencies, securities and commodities. 
          Digital Assets present a constantly changing environment in which the associated risks are also constantly changing. Accordingly, the risks described herein, 
          which may become outdated, are only a brief summary of certain aspects of the risks associated with investing in Digital Assets and are not exhaustive.
        </li>
         <br/>
        <li>
          <strong>b.Price volatility:</strong> The price of a Digital Asset is ultimately based on the perceived value of the Digital Asset and can be subject to changes 
          in sentiment, which may make these products highly volatile. You should be aware of the potentially extreme price volatility of some Digital Assets and the 
          possibility of rapid and substantial price movements, which could result in significant losses, including the loss of the full value, and in some cases, 
          more than the amount equal to the full value of such Digital Assets. Moreover, Digital Assets are not backed by a central bank, a national or international 
          organisation, assets or other forms of credit, although in some specific cases may be backed to an extent by physical assets. 
          Digital Assets may have no inherent value; in most cases, the price of Digital Assets is entirely dependent on the value that market participants place on them, 
          meaning that any increase or loss of confidence in Digital Assets may affect their value.
          <br/>
          Digital Assets may also be subject to momentum pricing due to speculation regarding future appreciation in value, 
          leading to greater volatility. Momentum pricing typically is associated with growth stocks and other assets whose valuation, 
          as determined by the investing public, accounts for future appreciation in value, if any. It is possible that momentum pricing of Digital Assets has resulted, 
          and may continue to result, in speculation regarding future appreciation in the value of Digital Assets, making Digital Asset prices more volatile. 
          As a result, Digital Assets may be more likely to fluctuate in value due to changing investor confidence, which could impact future appreciation or depreciation 
          in Digital Assets prices.
          <br/>
          There is no assurance that Digital Assets will maintain their long-term value or become more widely adopted (whether as a form of currency or otherwise). 
          On the contrary, they may cease to be used altogether.
        </li>
        <br/>
        <li>
          <strong>c.Valuation:</strong> It may prove difficult to determine the value of a given Digital Asset from time to time, 
          due to price volatility and the fragmentation of the Digital Asset markets. Published Digital Asset prices may deviate significantly between different exchanges 
          and other market venues as a result of liquidity imbalances, and weighted average prices may not provide an accurate representation of value.
           We do not guarantee that the price we provide in respect of any Digital Asset will be better than the price available from another exchange or market venue.
        </li>
        <br/>
        <li>
          <strong>d.Liquidity:</strong> Liquidity risk exists when particular investments are difficult to purchase or sell, possibly preventing you 
          from selling out of these illiquid investments at an advantageous price, or at all. Thin markets can also amplify volatility and cause significant delays 
          in executing trades. Any markets for these investments can be expected to involve wider price spreads and more sensitivity to buying and selling pressures 
          than is found in more active markets. Illiquidity can be caused by various factors, including but not limited to market conditions, regulatory actions, 
          technological issues, or other unforeseen circumstances. Illiquidity may impact the ability to open or close positions, leading to potential losses or 
          delays in accessing funds.
          <br/>
          Digital Assets may be illiquid investments that are not easily and readily convertible into fiat currencies, and some Digital Asset markets 
          may be thinner than others.
        </li>
        <br/>
        <li>
          <strong>e.Cybersecurity and malicious activity:</strong> Digital Assets are subject to increased cybersecurity risks when compared to other asset classes. 
          The cybersecurity risks of Digital Assets and related "wallets" or spot exchanges include hacking vulnerabilities, 
          and a risk that publicly distributed ledgers may not be immutable. A cybersecurity event could potentially result in a substantial, 
          immediate and irreversible loss for market participants that trade Digital Assets, including you and your holding of Digital Assets. 
          Even a minor cybersecurity event in a Digital Asset is likely to result in downward price pressure on that product and potentially other Digital Assets. 
          Digital Assets may be subject to fraud, manipulation and theft (which are not uncommon), not only through hacks but through other means, such as targeted schemes, 
          and you may not benefit from legal protections in such circumstances. Moreover, cybersecurity risks may arise by virtue of the structure of one or a series of 
          smart contracts or decentralised finance applications in ways that do not technically constitute exploitation of a "bug" or flaw in the smart contract or 
          application. If such features are exploited in the context of a decentralised finance ("DeFi") application, this could also trigger certain second order 
          consequences which may ultimately (and adversely) affect the value of the Digital Asset native to any associated blockchain network(s). 
          The occurrence of any of the abovementioned risks could result in significant loss and/or other market impacts (such as greater price volatility) 
          that may adversely impact your interests.
          <br/>
          Similarly, Digital Asset networks, platforms and exchanges may be subject to attack by malicious persons, entities or malware. For instance, 
          a malicious actor or group of actors could obtain a majority of the processing or 'hash' power on a particular Digital Asset network, 
          and could implement modifications to the network in a way that is detrimental to the liquidity or value of the 
          Digital Asset (commonly referred to as a '51% attack'), such as preventing transactions from posting accurately on the blockchain, 
          or at all, and/or allowing certain coins to be spent more than once. To the extent that such malicious person(s) does not yield its majority control 
          of the processing power on the network, reversing any changes made to the source code or blockchain may not be possible. Malicious activities such 
          as these may reduce confidence in Digital Assets and result in greater price volatility and could adversely affect your investment in Digital Assets.
        </li>
        <br/>
        <li>
          <strong>f.Development and maintenance of Digital Assets networks:</strong> Several Digital Assets networks operate on an open-source protocol maintained by a 
          group of uncompensated volunteer developers. Consequently, there may be a lack of financial incentive for developers to maintain or develop the network, 
          and the developers may lack the resources to adequately address emerging issues with the relevant Digital Asset protocol. There can be no assurance that 
          the core developers of a Digital Asset network will continue to be involved in the network, or that new volunteer developers will emerge to replace them. 
          To the extent that material issues arise with a Digital Asset protocol and the developers are unable or unwilling to address the issues adequately or in a 
          timely manner, the Digital Asset may diminish in value or become worthless.
          <br/>
          In addition, several Digital Assets rely on decentralised participants to operate the Digital Asset network through verifying transactions in Digital Assets 
          on an ongoing basis. The failure of decentralised participants to continue to maintain a network by verifying Digital Asset transactions may result in the 
          relevant Digital Asset losing value or becoming worthless.
        </li>
        <br/>
        <li>
          <strong>g.Risks of 'proof of stake' consensus mechanisms:</strong> Certain Digital Assets rely in whole or in part on a "proof of stake" method of generating 
          a distributed consensus. Proof of stake algorithms do not rely on resource intensive calculations to validate transactions and create new blocks in a blockchain; 
          instead, the validator of the next block is determined by reference to the amount of Digital Assets a user has "staked" and the amount of time it has been "staked,"
          which generates payments to such user in additional Digital Assets. While the advantage of a "proof of stake" system is that it is far less energy intensive 
          than a "proof of work" system, this may result in lower barriers for entry, which may allow for increased participation by malicious actors with small stakes 
          that attempt to manipulate the blockchain or increase the risk that the Digital Asset will experience one or more forks, which could impact its value.
          <br/>
          Founders of Digital Assets or Digital Asset networks may retain large amounts of the generated Digital Asset, 
          which large positions may result in such founders having an effective veto or ability to control the Digital Asset or its associated blockchain network. 
          As returns associated with staking are connected to the amount of the wealth staked, "proof of stake" systems may encourage hoarding of the Digital Asset. 
          While there are advantages to having users "buy in" to a Digital Asset and support its development, excessive hoarding reduces the "decentralised" nature of 
          verification of the blockchain and may impair the spread of such Digital Asset, including interfering with the widespread adoption of such Digital Assets for 
          use in transactions.
        </li>
        <br/>
        <li>
          <strong>h.Opaque market:</strong> Digital Asset balances are generally maintained as an address on the blockchain and are accessed through private keys, 
          which may be held by a market participant or a custodian. Although Digital Asset transactions are not typically private and are publicly available on a 
          blockchain or distributed ledger, the public address does not identify the controller, owner or holder of the private key. Unlike bank and brokerage accounts, 
          Digital Asset exchanges and custodians that hold Digital Assets do not always identify the owner. The opaque underlying or spot market may pose asset verification 
          challenges for market participants, regulators and auditors and potentially give rise to an increased risk of manipulation and fraud.
        </li>
        <br/>
        <li>
          <strong>i.Legality of Digital Assets:</strong> It may be illegal, now or in the future, to own, hold, sell or use Digital Assets in one or more countries. 
          Although currently most Digital Assets are not regulated or are lightly regulated in most countries, one or more countries may take regulatory actions in the 
          future that severely restrict the right to acquire, own, hold, sell or use Digital Assets or to exchange Digital Assets for fiat currency. 
          Such actions may restrict your ability to hold or trade Digital Assets (directly or indirectly).
        </li>
        <br/>
        <li>
          <strong>j.24/7 markets:</strong> Unlike conventional securities exchanges and other similar exchanges that are only available for transactions during standard trading hours, Digital Assets may be traded 24 hours a day, 7 days a week so long as the network that the Digital Assets exist on is operational. Most Digital Asset networks are available at any time and are supported by global cryptocurrency exchanges with continuous availability. As such, Digital Asset investments will likely be subject to changing market conditions at all times. This phenomenon may result in situations where you may not be able to respond to rapidly changing market conditions outside of regular business hours.
        </li>
        <br/>
        <li>
          <strong>k.Digital asset exchanges, intermediaries and custodians:</strong> Digital asset exchanges are relatively new and largely unregulated in many jurisdictions. The opaque underlying spot market and lack of regulatory oversight potentially creates a risk that a digital asset exchange may not hold sufficient digital assets and funds to satisfy its obligations to its customers and that such deficiency may not be easily identified or discovered. Many digital asset exchanges have experienced significant outages, downtime and transaction processing delays and may have a higher level of operational risk than regulated futures or securities exchanges. The same sorts of risks apply to other intermediaries, custodians and vendors used to facilitate digital assets transactions. This poses risks to the customers of such digital assets exchanges, intermediaries, custodians and vendors and may have adverse consequences for the Digital Assets that are the subject of any Transaction, and the digital assets markets more generally.
        </li>
        <br/>
        <li>
          <strong>l.Custody and security risks:</strong> Customers of third-party service providers for digital asset custody, trading, lending, staking or other purposes may not directly control the digital assets held through such third-party service providers. The obligations associated with these custodial and other arrangements to safeguard digital assets involve unique risks and uncertainties that are not present in arrangements for safeguarding conventional assets. For example, due to the unique characteristics of digital assets and the lack of legal precedent, there are significant legal questions surrounding how such arrangements would be treated in a court proceeding arising from an adverse event (e.g., fraud, loss, theft or bankruptcy).
          <br/>
          Furthermore, as compared to many common arrangements to safeguard assets for third parties, there are significantly fewer regulatory requirements for holding digital assets or entities may not be complying with regulatory requirements that do apply, which results in increased risks. In addition, the contractual terms with custodians (particularly liability terms) may be less favorable than contractual terms typically negotiated with custodians in respect of other assets and, in the event of any disputes under the terms of the custody agreement between the customer and the relevant custodian, the customer may be in a worse position than if it had appointed a custodian in respect of other assets. The financial institutions, exchanges or other third parties appointed to act as custodians may become insolvent, causing the relevant customer to lose all or a portion of the digital assets held by those custodians. In the event of bankruptcy of a third-party service provider, digital assets held by a third party may, in certain circumstances, be considered property of the bankruptcy estate and the customer could be treated as a general unsecured creditor in bankruptcy proceedings.
          <br/>
          The aforementioned risks may apply to you to the extent you engage third-party service providers in relation to digital asset custody, trading, lending, staking or other purposes, and could potentially lead to substantial losses (that we are not responsible for). They may also pose indirect risks, as we may rely on third-party service providers in relation to Digital Assets and/or Transactions from time to time.
        </li>
        <br/>
        <li>
          <strong>m.Loss or destruction of private keys:</strong> Digital Assets are generally only controllable by the possessor of the unique private key or keys relating to the wallet in which the Digital Asset is held. These keys are typically created by and stored within software known as a "digital wallet." While each Digital Asset network may require a public key be published when used in a transaction, any private keys linked with such public key must be safeguarded and kept private in order to prevent a third party from accessing the Digital Asset held in a digital wallet. To the extent a private key is lost, destroyed or otherwise compromised and no backup of the private key is accessible, you (or any custodian acting on your behalf) will be unable to access the Digital Assets held in the related wallet and, in most cases, the private key will not be capable of being restored. The loss or destruction of a private key required to access a Digital Asset may be irreversible. Any loss of private keys relating to Digital Assets could lead to substantial losses. The risk of loss due to losses of private keys or similar methodologies of secure access is generally greater for Digital Assets than that of other asset classes, given the variations in the sophistication of access methodologies and the inherent technological designs of Digital Assets.
        </li>
        <br/>
        <li>
          <strong>n.Risks in respect of blockchain technology:</strong> Digital Assets and Digital Asset networks typically involve cryptographic and other algorithmic protocols governing the issuance of Digital Assets that represent a new and rapidly evolving industry that is subject to a variety of factors that are difficult to evaluate. As Digital Asset networks continue to develop and grow, certain technical issues might be uncovered and the troubleshooting and resolution of such issues will likely require the attention and efforts of decentralised development communities. Moreover, in the past, flaws in the source code for Digital Asset networks have been exposed and exploited, including flaws that disabled some functionality for users, exposed users' personal information and/or resulted in the theft of users' Digital Assets. The cryptography underlying Digital Assets could prove to be flawed or ineffective, or developments in mathematics and/or technology, including advances in digital computing, algebraic geometry and quantum computing, could result in such cryptography becoming ineffective. In any of these circumstances, a malicious actor may be able to misappropriate your Digital Assets. Moreover, functionality of Digital Asset networks may be negatively affected such that it is no longer attractive to users, thereby reducing demand for the relevant Digital Asset.
          <br/>
          Even if only a particular Digital Asset was affected by such circumstances, any reduction in confidence in the source code or cryptography underlying Digital Assets generally could negatively affect the demand for Digital Assets.
        </li>
        <br/>
        <li>
          <strong>o.Uneven protocol adoption and forking:</strong> Often, there is no official developer or group of developers that formally controls a given Digital Asset network. Any individual can download the software that facilitates the operation of a Digital Asset network, and generally any user can make any desired modifications to such software. Such modifications in the protocol governing the Digital Asset network are proposed to users of the Digital Asset network through software downloads and upgrades. A substantial economic majority of users may need to consent to such software modifications by downloading and running the modified software in order for the proposed modifications to become part of the Digital Asset network. This process ensures that the Digital Asset network remains coherent over time. However, to the extent that the substantial economic majority of users do not accept a proposed modification to a Digital Asset network, but a material portion of the users do consent to the modification, it can create "forks" in the Digital Asset network's blockchain. Such forks create two alternative versions of the blockchain, starting from the point of the fork forward, and essentially cause the creation of two versions of the Digital Asset recorded on the blockchain. Such a fork in a blockchain typically would be addressed by community-led efforts to merge the forked blockchains, and several prior forks have been so merged. However, there can be no assurance that a fork in a blockchain will be resolved and permanent forks in blockchains have resulted.
          <br/>
          While theoretically the "splitting" of a Digital Asset that occurs when there is a hard fork in the blockchain should result in each user owning two assets that collectively are valued at the same level as the pre-split assets, this may not always be the case. The post-fork value of Digital Assets can be volatile and unpredictable. This could result in the holder owning the same asset after the fork as before the fork, but at a lower market value. Further, one or both of the post-fork Digital Asset(s) may not be supported by an adequate amount of network participants or developers and may be vulnerable to attacks and other risks. A market participant holding a Digital Asset may also be adversely impacted if its custodian does not allow its customers to participate in a fork that creates a new product. To the extent that Digital Assets in which you invested experience a fork in their blockchains, you could experience significant losses.
          <br/>
          Additionally, in certain circumstances forks may be deliberately created by malicious actors. In the event that a majority of the users, or processing power, associated with a Digital Asset have adopted an adverse amendment to a protocol, the investment in such Digital Asset, or the ability to trade such Digital Asset, may be materially impacted.
        </li>
        <br/>
        <li>
          <strong>p.Regulatory uncertainty:</strong> The value and liquidity of Digital Asset markets may be influenced by new laws, regulations, policies and guidance which may vary significantly among international, federal, state and local jurisdictions and are subject to significant uncertainty. The regulatory environment for Digital Assets is constantly evolving, and new regulations or policies may materially adversely affect your ability to invest in Digital Assets. Regulation of Digital Assets may also vary significantly among international, federal, state, and local jurisdictions and is subject to a level of uncertainty. Various legislative and executive bodies in the United States and in other countries may in the future adopt laws, regulations, or guidance, or take other actions, which may severely impact the use of Digital Assets generally and the technology behind them or the means of transacting in or transferring them. Failure by you to comply with any current or future laws, rules and regulations, some of which may be subject to change, could result in a variety of adverse consequences.
        </li>
        <br/>
        <li>
          <strong>q.Irreversibility and irrecoverability:</strong> Digital Asset transactions and transfers are generally irreversible without the consent and active participation from the recipient of the transaction. To the extent that any of your Digital Assets are incorrectly or fraudulently transferred, they are likely to be irretrievable. Furthermore, where Digital Assets have been lost, stolen or destroyed under circumstances rendering a party liable to you, then you may have limited recourse against the responsible party. For example, as to a particular event of loss, the only source of recovery might be limited to your custodian or, to the extent identifiable, other responsible third parties (e.g. a thief or terrorist), which may not have the financial resources (including liability insurance coverage) to satisfy a valid claim.
        </li>
        <br/>
        <li>
          <strong>r.Risks in relation to stablecoins:</strong> Stablecoins are Digital Assets that seek to minimise volatility and maintain a stable value, including by being backed by an asset or portfolio of assets, such as fiat currency, or other methods, such as algorithmically controlled supply. There is a risk that the sponsor or issuer (including a smart contract) of a stablecoin does not hold the corresponding asset underlying each stablecoin in circulation and is therefore unable to fulfil one-for-one or other forms of redemptions. Alternatively, software designed to maintain the value of a stablecoin may be subject to errors, flaws, bugs or be subject to hacking or manipulation. Such risks may result in losses in the wider digital assets markets.
          <br/>
          In addition, stablecoin issuers or sponsors (including smart contracts and their programmers) may be unregulated and may not provide transparent disclosure regarding their compliance with applicable licensing and regulatory requirements or the financial institutions that hold the underlying assets. Moreover, statements from the regulators in certain jurisdictions suggest that stablecoins may be regulated as securities in those jurisdictions, and some have initiated and settled enforcement proceedings. If a stablecoin issuer or sponsor fails to maintain required licenses to issue a stablecoin, it could subject the issuer or sponsor to regulatory enforcement and injunctive actions, such as freezing funds underlying the stablecoin. The stablecoin issuer or sponsor could also lose its relationships with banks and bank accounts where the underlying assets are deposited if it is engaged in unlicensed activities. If any of these events occur, the value of the affected stablecoins could materially decline, which could have an adverse effect on any Transaction you have entered in respect of such stablecoin.
        </li>
      </ol>`,
  },
  {
    id: 8,
    title: "VIII.Instructions and settlement",
    description: `<p>We may, in accordance with Applicable Regulations and at our discretion, refuse to accept Instructions from you, 
    including (but not limited to) cases where Instructions require us to make any payment or incur any liability before receipt of sufficient 
    cleared funds from you. Similarly, we will not be obliged to settle any Transaction or make certain payments or deliveries to you until 
    we (or our settlement agent) have received all necessary documents or cleared funds from you. We shall not be deemed to be holding property 
    on your behalf pending settlement of a Transaction.</p>`,
  },
  {
    id: 9,
    title: "IX.Liability, indemnity, and force majeure",
    description: `<p>Neither we nor any Associate nor any of the Indemnified Parties shall be liable for any Loss arising from any act or omission 
    in the course of or relating to the activities to which the Terms of Business or any Trading Agreement apply, subject to certain limitations. 
    Moreover, you undertake to indemnify and hold us, our Associates (including in respect of any Associate that is a broker) and the Indemnified 
    Parties harmless against any Loss which any of the foregoing may suffer or incur directly or indirectly in connection with or as a result of 
    anything done or omitted to be done for the purpose of carrying out any Transaction for your account or providing any Service to you or 
    otherwise acting on your Instructions under these Terms of Business or any Trading Agreement, subject to certain limitations. 
    You shall also pay any penalties arising in respect of the Transactions you enter. In the event of any failure, interruption or 
    delay in the performance of our obligations resulting from acts, events or circumstances not reasonably within our or any Associate’s control, 
    neither we nor any Associate shall be liable or have any responsibility for any Loss whatsoever
    thereby incurred or suffered by you, and we shall not be obliged to take or refrain from taking any action in such circumstances.</p>`,
  },
  {
    id: 10,
    title: "X.No investment advice",
    description: `<p>Information provided by MCCOIN does not constitute investment advice, financial advice, trading advice, 
    or any other type of advice whatsoever and is presented rather as general market commentary. 
    We shall not provide any investment advice in relation to a transaction in the form of personal recommendations or advise on the merits of buying, 
    selling, or otherwise dealing in particular instruments and/or investments or executing particular transactions, 
    any tax, legal or other economic consequences or any other rights or obligations attaching to such instruments, 
    investments or transactions. Therefore, you must rely solely on your own judgment in deciding to enter into 
    or close a transaction and we make no assessment of the suitability of such actions for you. We give no warranty 
    as to the performance or profitability of any transaction or investment that you may effect through us. 
    We will not be held responsible for any investment decisions made based on the information provided by MCCOIN.</p>`,
  },
  {
    id: 11,
    title: "XI.You are not acting as intermediary",
    description: `<p>We will deal with you on the basis that you act as principal and not as agent acting on behalf of or for the benefit of a principal. 
    Furthermore, your failure to inform us that another person or any software and/or algorithm is operating your account on your behalf 
    may result in us terminating the agreement, voiding any transactions, undertaking or closing any open transactions.</p>`,
  },
  {
    id: 12,
    title: "XII.Charges, fees and taxes",
    description: `<p>Interest, taxes, costs, spreads, fees, and charges may be payable by you to us when you trade or on such other basis as 
    agreed between us or as notified by us to you from time to time. These taxes, charges, costs, spreads and fees will reduce your trading net 
    profits (if any) or increase your trading losses. It is possible that your intended treatment of the services provided by us to you under 
    the Terms of Business or any Trading Agreement may be challenged by tax authorities. You must seek your own tax advice as to such services 
    which may result in adverse tax consequences to you.</p>`,
  },
  {
    id: 13,
    title: "XIII.Conflicts of interest",
    description: `<p>While we have put in place and will maintain effective organisational and administrative arrangements with a 
    view to taking all appropriate steps to identify and manage conflicts of interest between us and our clients and relevant third parties, 
    conflicts of interest may nevertheless arise. You irrevocably waive any claim you may have against us or any Associate 
    (and release us and them from all liability) in respect of any material interest or conflict that we or any Associate may have, 
    whether or not disclosed to you. If we cannot avoid conflicts of interest after using all reasonable efforts, 
    we will disclose such conflicts to affected clients. Otherwise, we need not disclose to you, or any other client, 
    the nature or extent of any interest we or any Associate may have in any Transaction or in any resulting transactions, 
    that we may owe duties to other clients which otherwise conflict with our duties owed to you, 
    or that we may have a relationship which gives rise to a conflict of interest, unless obliged to do so under Applicable Regulations. 
    We shall be entitled to retain any profit or benefit arising as if no such interest, other duties or relationship existed.</p>`,
  },
  {
    id: 14,
    title: "XIV.Acknowledgement",
    description: `<p>By entering into any Transaction, you understand, acknowledge and agree that:</p>
      <br/>
      <ol type="a">
        <li>a.you have received a copy of this Risk Disclosure Statement and read and understood the nature and consequences of the risk factors described herein and have had an opportunity to raise questions and to discuss those risks with any advisors as you have deemed to be necessary or desirable;</li>
        <br/>
        <li>b.the risk factors cannot disclose all the risks and other significant aspects of the Transactions to be entered into with us and thus cannot be taken as a comprehensive or exhaustive list of all possible risks;</li>
        <br/>
        <li>c.you are acting on your own account and have reviewed carefully your specific financial needs and investment objectives before entering into any Transaction, and you have made your own independent decision to enter into any Transaction and as to the legality, suitability and appropriateness of any Transaction based upon your own judgment and upon advice from such advisers as you have deemed necessary or desirable;</li>
        <br/>
        <li>d.you confirm that neither MCCOIN, nor any Associate of MCCOIN, is acting as a fiduciary for or an adviser to you in respect of any Transaction;</li>
        <br/>
        <li>e.you are not relying on any communication (written or oral) from MCCOIN or from any Associate of MCCOIN as investment advice or as a recommendation to enter into any Transaction and you understand that the information and explanations of the terms of any Transaction as contained in any Confirmation shall not be considered to be investment advice or a recommendation to enter into such Transaction;</li>
        <br/>
        <li>f.you understand the tax implications of any Transactions, particularly as regards to Transactions involving Digital Assets, in your jurisdiction including, without limitation, income tax, corporation tax, capital gains tax or any sales tax or value added tax and any other tax framework in place within your country of residence for tax purposes;</li>
        <br/>
        <li>g.MCCOIN assumes no responsibility for your portfolio or for any investment or Transaction which you have entered into, and any opinions, projections, estimates, forecasts and/or targets expressed in any communication (written or oral) from MCCOIN should not be construed as or relied upon in any manner as investment, legal, tax or other advice, are provided for informational purposes only, and are subject to change without notice;</li>
        <br/>
        <li>h.in the event of any inconsistency between the English version of this document and any translation, the English version will prevail and that if you are in any doubt as to the meaning of the English language version or the accuracy of any translation, you should seek independent advice before entering into any Transaction;</li>
        <br/>
        <li>i.this Risk Disclosure Statement may be varied, amended or supplemented from time to time and by using the Services after any changes to the Risk Disclosure Statement is varied, amended or supplemented, your agreement to such variations, amendments or supplementation is deemed to have been given to MCCOIN;</li>
        <br/>
        <li>j.no communication (written or oral) received from MCCOIN or from any Associate of MCCOIN shall be deemed to be an assurance or guarantee as to the expected results of any Transaction;</li>
        <br/>
        <li>k.you are a professional investor, market counterparty or equivalent definition as set out under the applicable law in your country of residence/registration and you are eligible, in accordance with the applicable law, to request such information and/or be offered/avail of one or more of the products/services indicated herein;</li>
        <br/>
        <li>l.you have approached MCCOIN on your own exclusive initiative and that this approach does not come about as a result of any direct or indirect contact, solicitation, intervention, marketing and/or pre-marketing, arranging, advice, offering or placement efforts nor as result of any form of general solicitation or advertising such as media advertising or public seminars by or on behalf of MCCOIN and its Associate;</li>
        <br/>
        <li>m.to the extent you have already received any of the information, documentation above and/or any other communication concerning MCCOIN, this information, documentation, including this form and/or communication was sent to the undersigned at and after your request and otherwise only upon your own initiative;</li>
        <br/>
        <li>n.the decision to avail yourself of our services/products is/will be based solely on your own due diligence and review of information and materials received/to be received at your request; and</li>
        <br/>
        <li>o.if any of the above become untrue or inaccurate, you will promptly inform us in writing, acknowledging that this may cause MCCOIN to stop or otherwise refrain from providing you with its services/products.</li>
      </ol>
`,
  },
];

export const termsAndConditionsData = [
  {
    id: 1,
    title: "1. Acceptance of Terms",   
    description: `By accessing or using the MCcoin Cryptocurrency Exchange platform ("MCcoin" or "the Platform"), you agree to comply with and be bound by the following Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the platform.`
  },
  {
    id: 2,
    title: "2. User Eligibility",   
    description: `To use the MCcoin platform, you must be of legal age in your jurisdiction and comply with all applicable laws and regulations. By accessing the platform, you confirm that you meet these eligibility requirements.`
  },
  {
    id: 3,
    title: "Account Registration",   
    description: `To access certain features of the platform, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.`
  },

  {
    id: 4,
    title: "4. Security and Confidentiality",   
    description: `You are responsible for maintaining the confidentiality of your account information, including your password and any 2FA credentials. You agree to notify MCcoin immediately of any unauthorized use of your account or any other breach of security.`
  },
  {
    id: 5,
    title: "5. Trading Risks",   
    description: `Cryptocurrency trading involves risks, and prices can be highly volatile. MCcoin does not guarantee profits, and users are advised to conduct their own research and seek financial advice before making any trading decisions.`
  },
  {
    id: 6,
    title: "6. Compliance with Laws",   
    description: `Users are responsible for complying with all local and international laws and regulations applicable to their use of the MCcoin platform. MCcoin reserves the right to refuse service to anyone at its discretion.`
  },
  {
    id: 7,
    title: "7. User Conduct",   
    description: `Users agree not to engage in any activity that may disrupt the operation of the platform or compromise its security. Prohibited activities include, but are not limited to, hacking, fraud, market manipulation, and any other illegal or unethical conduct.`
  },
  {
    id: 8,
    title: "8. KYC Verification",   
    description: `MCcoin may require users to undergo Know Your Customer (KYC) verification for security and regulatory compliance. Users agree to provide accurate and complete information during the verification process.`
  },
  {
    id: 9,
    title: "9. Fees and Charges",   
    description: `Users are responsible for understanding and paying any fees associated with their use of the platform. MCcoin reserves the right to modify fee structures and introduce new fees with prior notice.`
  },
  {
    id: 10,
    title: "10. Termination of Services",   
    description: `MCcoin reserves the right to terminate or suspend your account and access to the platform at its discretion, with or without cause, and with or without notice.`
  },
  {
    id: 11,
    title: "11. Intellectual Property",   
    description: `All intellectual property rights related to the MCcoin platform, including but not limited to trademarks, logos, and software, are the property of MCcoin. Users agree not to use, reproduce, or distribute any intellectual property without the express written consent of MCcoin.`
  },
  {
    id: 12,
    title: "12. Limitation of Liability",   
    description: `MCcoin is not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the platform.`
  },
  {
    id: 13,
    title: "13. Amendments to Terms",   
    description: `MCcoin reserves the right to modify these Terms at any time. Users will be notified of any changes, and continued use of the platform after such modifications constitutes acceptance of the updated Terms.`
  },
  {
    id: 14,
    title: "14. Governing Law and Dispute Resolution",   
    description: `These Terms are governed by and construed in accordance with the laws of Dubai, UAE. Any dispute arising out of or in connection with these Terms will be resolved through arbitration in accordance with the rules of Dubai Courts.`
  },
  {
    id: 15,
    title: "15. Contact Information",   
    description: `For any inquiries regarding these Terms and Conditions, please contact MCcoin at info@mccoin.com.
By using the MCcoin platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.`
  }
]   
export const privacyPolicyData = [
  {
    id: 1,
    title: "Information We Collect",
    description: "We collect the following types of personal information to provide our services, comply with regulatory obligations, and improve your user experience:",
    sections: [
      {
        title: "Personal Identification Information",
        bullets: [
          "Full Name: First and last name",
          "Date of Birth: To ensure you meet age-related requirements",
          "Nationality: For KYC (Know Your Customer) and regulatory compliance",
          "Contact Information: Email address, phone number, physical address"
        ]
      },
      {
        title: "Financial Information",
        bullets: [
          "Bank Details: Including bank account numbers and payment methods",
          "Payment Information: Credit card details, payment history, and virtual asset wallet addresses",
          "Transaction History: Details of virtual asset purchases, sales, transfers, and exchanges"
        ]
      },
      {
        title: "Identity Verification Information (for KYC/AML compliance)",
        bullets: [
          "Government-Issued IDs: Passport, national ID card, or driving license",
          "Proof of Address: Utility bills, bank statements, or official documents",
          "Biometric Data: If required for identity verification (e.g., facial recognition, fingerprints)"
        ]
      },
      {
        title: "Device and Usage Data",
        bullets: [
          "IP Address: To detect and prevent fraud, and to improve security",
          "Browser and Device Information: Including device type, operating system, and web browser",
          "Cookies and Tracking Data: For analytics, user experience improvement, and personalization"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "How We Use Your Information",
    description: "We use the collected personal data for the following purposes:",
    sections: [
      {
        title: "A. To Provide Our Services",
        bullets: [
          "Facilitate your access to and use of our platform",
          "Process transactions involving virtual assets and related activities (purchases, transfers, exchanges)",
          "Provide account management and customer support"
        ]
      },
      {
        title: "B. To Comply with Legal and Regulatory Requirements",
        bullets: [
          "Know Your Customer (KYC): Collect and verify your identity to prevent fraud and comply with AML (Anti-Money Laundering) and CTF (Counter-Terrorism Financing) obligations as per FATF and VARA regulations.",
          "AML & CTF Compliance: Monitor transactions for signs of suspicious activity and report any unusual or potentially illicit activities to the appropriate regulatory bodies, as required by UAE law and FATF guidelines.",
          "Transaction Monitoring: Conduct ongoing surveillance of your financial activity to detect and prevent money laundering or terrorist financing.",
          "Regulatory Reporting: Share your data with regulatory authorities if required by law or under legal processes such as subpoenas or court orders."
        ]
      },
      {
        title: "C. To Improve Security",
        bullets: [
          "Enhance the security of your account by identifying and mitigating potential threats or breaches",
          "Use encryption to protect sensitive personal and financial data",
          "Implement fraud detection systems"
        ]
      },
      {
        title: "D. To Communicate with You",
        bullets: [
          "Send you essential notifications (e.g., transaction confirmations, account activity, system updates)",
          "Provide updates about our services, promotions, or news, only if you have opted in for marketing communications"
        ]
      }
    ],
    summary: "All data usage complies with UAE Data Protection Law (2021) and FATF recommendations."
  },
  {
    id: 3,
    title: "Data Retention Policy",
    description: "We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy and to comply with regulatory requirements:",
    sections: [
      {
        title: "Identity Verification Data",
        bullets: [
          "KYC documents and verification data will be retained for a minimum of five (5) years after the termination of our relationship with you, in compliance with FATF's recommendation on record-keeping for AML/CTF purposes."
        ]
      },
      {
        title: "Transaction Records",
        bullets: [
          "We retain data related to virtual asset transactions, including wallet addresses, transaction amounts, and dates, for a minimum of five (5) years as required by UAE law and VARA regulations."
        ]
      },
      {
        title: "Account Information",
        bullets: [
          "Account data may be retained until you request deletion or termination of your account, subject to legal retention requirements."
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Sharing and Disclosure of Your Information",
    description: "We may share your personal data in the following scenarios:",
    sections: [
      {
        title: "A. Service Providers",
        bullets: [
          "We may engage third-party service providers to support our business operations, such as payment processors, customer service platforms, fraud prevention tools, and identity verification services. These service providers may have access to your personal information, but only to the extent necessary to perform their tasks on our behalf."
        ]
      },
      {
        title: "B. Regulatory Authorities and Law Enforcement",
        bullets: [
          "We may disclose your information to UAE regulatory bodies, including VARA, the UAE Central Bank, or other governmental agencies, if required by law or to comply with legal obligations such as AML/CTF regulations. This may also include disclosures to law enforcement agencies if requested under applicable legal processes."
        ]
      },
      {
        title: "C. Business Transactions",
        bullets: [
          "In the event of a merger, acquisition, or sale of assets, your personal information may be transferred as part of the transaction. We will ensure that any acquiring entity adheres to this Privacy Policy."
        ]
      },
      {
        title: "D. Other Legal Compliance",
        bullets: [
          "We may disclose your personal data in cases where it is necessary to protect our legal rights, defend against legal claims, or fulfill our obligations under applicable laws or regulations."
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Security of Your Data",
    description: "We implement robust security measures to protect your personal data:",
    sections: [
      {
        bullets: [
          "Encryption: Sensitive data such as financial and identity information is encrypted both during transmission and while stored.",
          "Access Control: Access to your personal data is restricted to authorized personnel only, and we use multi-factor authentication (MFA) to enhance account security.",
          "Regular Audits: We perform regular security audits and assessments to identify and mitigate any vulnerabilities."
        ]
      }
    ],
    summary: "While we take reasonable measures to safeguard your personal information, no security system is 100% secure. We cannot guarantee the absolute security of your data."
  },
  {
    id: 6,
    title: "Your Rights Under UAE Data Protection Law",
    description: "As per the UAE Data Protection Law (2021) and other applicable regulations, you have the following rights:",
    sections: [
      {
        bullets: [
          "Right to Access: You may request access to the personal data we hold about you.",
          "Right to Rectification: You have the right to correct any inaccurate or incomplete data.",
          "Right to Deletion: You may request that we delete your personal data, subject to legal retention obligations.",
          "Right to Object or Restrict Processing: You may object to the processing of your personal data or request restrictions on how it is used.",
          "Right to Data Portability: You may request a copy of your data in a structured, commonly used, and machine-readable format.",
          "Right to Withdraw Consent: Where we rely on consent for processing, you can withdraw your consent at any time."
        ]
      }
    ],
    summary: "To exercise any of these rights, please contact us at the contact details provided below."
  },
  {
    id: 7,
    title: "Cookies and Tracking Technologies",
    description: "We use cookies and similar technologies to enhance your experience on our platform:",
    sections: [
      {
        bullets: [
          "Cookies allow us to remember your preferences and offer personalized services.",
          "By using our platform, you consent to our use of cookies as described in this Privacy Policy.",
          "You may control cookies through your browser settings, but please note that disabling cookies may affect the functionality of our platform."
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Compliance with FATF, UAE, and VARA Regulations",
    description: "As a licensed virtual asset service provider, McCoin Virtual Assets LLC adheres to the Financial Action Task Force (FATF) guidelines on Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF). This includes:",
    sections: [
      {
        bullets: [
          "Know Your Customer (KYC): We collect and verify your identity, address, and other relevant details before allowing you to transact on our platform.",
          "Transaction Monitoring: We continuously monitor transactions for suspicious activity and comply with FATF's requirements on reporting such activities.",
          "AML & CTF Procedures: We use advanced tools and processes to detect and prevent money laundering and financing of terrorism in alignment with FATF's 40 recommendations.",
          "Compliance with VARA Regulations: As per VARA's guidelines, we ensure that virtual asset services we provide are compliant with UAE regulations for data protection, financial security, and consumer protection."
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Changes to This Privacy Policy",
    description: "We reserve the right to update or amend this Privacy Policy from time to time:",
    sections: [
      {
        bullets: [
          "Updates will reflect changes in our practices, legal requirements, or technological advancements.",
          "Any updates will be posted on this page, and the effective date will be revised accordingly.",
          "Please check this page periodically for the latest information."
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Contact Us",
    description: "If you have any questions about this Privacy Policy or how we handle your personal data, or if you wish to exercise your rights under this policy, please contact us at:",
    sections: [
      {
        bullets: [
          "McCoin Virtual Assets LLC",
          "Email: compliance@mccoin.com",
          "Phone: 0585798074"
        ]
      }
    ]
  }
];