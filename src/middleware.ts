// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Read a comma-separated list of IPs/CIDRs from env, e.g.:
// ALLOW_IPS="203.0.113.42,203.0.113.0/24,2001:db8::/32"
const ALLOW = (process.env.ALLOW_IPS ?? '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// In dev, skip blocking so you can work locally.
const BYPASS_IN_DEV = process.env.NODE_ENV !== 'production';

export default async function middleware(request: NextRequest) {
  // 1) Handle internationalization first (may rewrite/redirect)
  const intlResponse = intlMiddleware(request);
  if (intlResponse) return intlResponse;

  // 2) IP allowlist (Edge-safe)
  if (!BYPASS_IN_DEV) {
    const xff = request.headers.get('x-forwarded-for');
    const xri = request.headers.get('x-real-ip');
    const clientIp = xff?.split(',')[0]?.trim() || xri?.trim() || null;

    if (!clientIp || !isAllowed(clientIp, ALLOW)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // 3) Continue
  return NextResponse.next();
}

// Keep your existing matcher so assets, api, etc. are skipped
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

/* ------------------ Helpers (Edge-compatible) ------------------ */

function isAllowed(ip: string, rules: string[]): boolean {
  const normIp = normalizeIp(ip);
  for (const rule of rules) {
    if (rule.includes('/')) {
      if (isInCidr(normIp, rule)) return true;
    } else {
      if (normIp === normalizeIp(rule)) return true;
    }
  }
  return false;
}

function isInCidr(ip: string, cidr: string): boolean {
  const [base, bitsStr] = cidr.split('/');
  const bits = Number(bitsStr);
  const baseNorm = normalizeIp(base);

  if (isIPv4(ip) && isIPv4(baseNorm)) {
    const ipNum = ipv4ToNum(ip);
    const baseNum = ipv4ToNum(baseNorm);
    const mask = bits === 0 ? 0 : ~((1 << (32 - bits)) - 1) >>> 0;
    return (ipNum & mask) === (baseNum & mask);
  }

  if (isIPv6(ip) && isIPv6(baseNorm)) {
    const ipBig = ipv6ToBigInt(ip);
    const baseBig = ipv6ToBigInt(baseNorm);
    const mask = bits === 0 ? BigInt(0) : (BigInt(-1) << BigInt(128 - bits));
    return (ipBig & mask) === (baseBig & mask);
  }

  return false;
}

function isIPv4(ip: string) { return ip.includes('.'); }
function isIPv6(ip: string) { return ip.includes(':'); }

function normalizeIp(ip: string): string {
  // Strip [ ] around IPv6 if present
  if (ip.startsWith('[') && ip.endsWith(']')) ip = ip.slice(1, -1);

  // If it's IPv4, return as-is
  if (isIPv4(ip)) return ip.trim();

  // If it's IPv6, expand shorthand (::)
  if (isIPv6(ip)) return expandIPv6(ip.trim());

  return ip.trim();
}

function ipv4ToNum(ip: string): number {
  return ip.split('.').map(n => Number(n)).reduce((a, b) => (a << 8) + b) >>> 0;
}

// Expand IPv6 (:: shorthand)
function expandIPv6(ip: string): string {
  if (ip === '::') return '0:0:0:0:0:0:0:0';
  const [left, right = ''] = ip.split('::');
  const l = left ? left.split(':').filter(Boolean) : [];
  const r = right ? right.split(':').filter(Boolean) : [];
  const missing = 8 - (l.length + r.length);
  const mid = Array(Math.max(missing, 0)).fill('0');
  return [...l, ...mid, ...r].map(h => h || '0').slice(0, 8).join(':');
}

function ipv6ToBigInt(ip: string): bigint {
  const parts = expandIPv6(ip).split(':');
  let result = BigInt(0);
  for (const p of parts) {
    const v = BigInt(parseInt(p || '0', 16));
    result = (result << BigInt(16)) + v;
  }
  return result;
}
