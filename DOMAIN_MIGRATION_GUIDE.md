# Domain Migration Guide

## New Production Domain
**New URL:** `https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app`

## Changes Made

### ✅ SEO & Metadata Files Updated

1. **`src/app/robots.ts`**
   - Updated `baseUrl` fallback to new domain
   - Robots.txt will now reference correct sitemap URL

2. **`src/app/sitemap.ts`**
   - Updated `baseUrl` fallback to new domain
   - All sitemap URLs now point to new domain

3. **`src/lib/metadata.ts`**
   - Updated `baseUrl` fallback to new domain
   - All Open Graph and Twitter card metadata now use new domain
   - Canonical URLs updated

4. **`src/app/[locale]/blog/layout.tsx`**
   - Updated `metadataBase` to new domain

5. **`src/app/[locale]/blog/[slug]/page.tsx`**
   - Updated `BASE` constant to new domain
   - All blog post metadata URLs updated

6. **`src/app/[locale]/blog/[slug]/sitemap.ts`**
   - Updated `baseUrl` for blog post sitemaps

7. **`src/app/[locale]/blog/[slug]/robots.ts`**
   - Updated sitemap reference to new domain

8. **`src/app/[locale]/blog/page.tsx`**
   - Updated structured data base URL

9. **`src/app/[locale]/news-room/[news_room_id]/page.tsx`**
   - Updated Open Graph URL to new domain

10. **`src/app/[locale]/crypto101/[id]/page.tsx`**
    - Updated Open Graph URL to new domain

11. **`public/og-image.svg`**
    - Updated domain text in SVG

### ✅ Authentication & Email Files Updated

12. **`src/auth.ts`**
    - Updated production fallback URL for NextAuth

13. **`src/lib/mail.ts`**
    - Updated all `baseUrl` fallbacks (3 instances)
    - Email templates now use new domain for:
      - Password reset links
      - Email verification links
      - Contact form emails
      - Logo images in emails

### ✅ API Documentation Updated

14. **`src/lib/openapi.ts`**
    - Updated production server URL in OpenAPI spec

## Environment Variables Required

Make sure to set these environment variables in your Vercel project:

### Required Environment Variables:
```bash
NEXT_PUBLIC_BASE_URL=https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app
NEXTAUTH_URL=https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app
```

### Optional (but recommended):
```bash
VERCEL_URL=mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app
```

## SEO Impact

### What's Updated:
- ✅ Robots.txt - Points to correct sitemap
- ✅ Sitemap.xml - All URLs use new domain
- ✅ Canonical URLs - All pages reference new domain
- ✅ Open Graph tags - Social sharing uses new domain
- ✅ Twitter Cards - Twitter sharing uses new domain
- ✅ Structured Data (JSON-LD) - Blog structured data uses new domain
- ✅ Email links - All email templates use new domain

### Next Steps for SEO:

1. **Submit New Sitemap to Search Engines:**
   - Google Search Console: Submit `https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app/sitemap.xml`
   - Bing Webmaster Tools: Submit the same sitemap

2. **Set Up 301 Redirects (if old domain still exists):**
   - If you have the old domain, set up redirects from old URLs to new URLs
   - This preserves SEO rankings

3. **Update Google Search Console:**
   - Add the new domain as a property
   - Verify ownership
   - Submit the new sitemap

4. **Update Social Media:**
   - Update any social media profiles that link to your website
   - Update Open Graph previews will automatically use new domain

5. **Update External Links:**
   - Update any external websites linking to your site
   - Update any documentation or marketing materials

6. **Test SEO Elements:**
   - Test robots.txt: `https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app/robots.txt`
   - Test sitemap: `https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app/sitemap.xml`
   - Test Open Graph tags using: https://www.opengraph.xyz/
   - Test Twitter Cards using: https://cards-dev.twitter.com/validator

## Testing Checklist

- [ ] Verify robots.txt is accessible
- [ ] Verify sitemap.xml is accessible
- [ ] Test email links (password reset, verification)
- [ ] Test Open Graph previews on social media
- [ ] Verify canonical URLs in page source
- [ ] Check structured data with Google Rich Results Test
- [ ] Verify all internal links work correctly
- [ ] Test authentication flows (login, signup, password reset)

## Important Notes

1. **Environment Variables:** The code uses environment variables with fallbacks. For production, always set `NEXT_PUBLIC_BASE_URL` and `NEXTAUTH_URL` in Vercel.

2. **Email Links:** All email templates now use the new domain. Existing emails with old domain links will still work if you set up redirects.

3. **Caching:** After deployment, clear any CDN caches to ensure new URLs are served.

4. **Search Engine Indexing:** It may take a few days for search engines to re-index your site with the new domain.

## Files Changed Summary

- **14 files updated** with new domain
- **All SEO metadata** updated
- **All email templates** updated
- **All API documentation** updated
- **All sitemap/robots** files updated

All changes maintain backward compatibility through environment variables, so the code will work in both development and production environments.

