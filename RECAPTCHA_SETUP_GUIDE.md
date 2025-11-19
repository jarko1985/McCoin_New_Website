# Google reCAPTCHA Setup Guide

## Overview
This guide will help you set up Google reCAPTCHA v2 for your McCoin login and signup pages. reCAPTCHA is now **mandatory** for both authentication endpoints to prevent bots and automated attacks.

---

## Step 1: Get Google reCAPTCHA Keys

### 1.1 Visit Google reCAPTCHA Admin Console
1. Go to: **https://www.google.com/recaptcha/admin/create**
2. Sign in with your Google account (or create one if needed)

### 1.2 Create a New Site
1. Click **"Create"** or **"+"** button
2. Fill in the form:

   **Label:** 
   - Enter a name for your site (e.g., "McCoin Production" or "McCoin Website")

   **reCAPTCHA type:**
   - Select **"reCAPTCHA v2"**
   - Choose **"I'm not a robot" Checkbox** (recommended)
   - ⚠️ **DO NOT** select "Invisible reCAPTCHA" or "reCAPTCHA v3" - the current implementation uses v2 checkbox

   **Domains:**
   - Add your production domain: `mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app`
   - For local development, add: `localhost`
   - You can add multiple domains (one per line)
   - ⚠️ **Important:** Make sure to add your exact domain. Subdomains are treated separately.

   **Owners:**
   - Your email will be automatically added

3. Accept the reCAPTCHA Terms of Service
4. Click **"Submit"**

### 1.3 Get Your Keys
After creating the site, you'll see two keys:

1. **Site Key (Public Key)** - This is safe to expose in client-side code
   - Example: `6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890`
   - Starts with `6L...`

2. **Secret Key (Private Key)** - This must be kept secret and only used server-side
   - Example: `6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890`
   - Also starts with `6L...`

⚠️ **IMPORTANT:** 
- Never commit the Secret Key to version control
- Never expose the Secret Key in client-side code
- Keep both keys secure

---

## Step 2: Add Environment Variables

### 2.1 Local Development (.env.local)
Create or update `.env.local` in your project root:

```bash
# Google reCAPTCHA Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890
RECAPTCHA_SECRET_KEY=6LcAbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Replace the example keys with your actual keys from Step 1.3**

### 2.2 Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   **Variable Name:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Value:** Your Site Key (from Step 1.3)
   - **Environment:** Production, Preview, Development (select all)
   
   **Variable Name:** `RECAPTCHA_SECRET_KEY`
   - **Value:** Your Secret Key (from Step 1.3)
   - **Environment:** Production, Preview, Development (select all)
   - ⚠️ **Important:** This is a secret - make sure it's not exposed

4. Click **"Save"**
5. **Redeploy** your application for changes to take effect

---

## Step 3: Verify Installation

### 3.1 Check Environment Variables
After setting up, verify the keys are loaded:

1. **Local Development:**
   - Restart your Next.js dev server
   - Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is accessible in the browser console
   - The reCAPTCHA widget should appear on login/signup pages

2. **Production:**
   - After redeploying, visit your login/signup pages
   - The reCAPTCHA checkbox should be visible
   - If you see a yellow warning box, the Site Key is not configured

### 3.2 Test reCAPTCHA
1. Go to the **Login page** (`/en/login` or `/ar/login`)
2. You should see a reCAPTCHA checkbox above the login button
3. Try to submit without checking the box → Should show an error
4. Check the box → Should allow submission
5. Repeat the same test on the **Signup page** (`/en/signup` or `/ar/signup`)

---

## Step 4: Troubleshooting

### Issue: reCAPTCHA widget not showing
**Possible causes:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is not set or incorrect
- Domain mismatch (the domain in reCAPTCHA admin doesn't match your current domain)
- Network/firewall blocking Google's reCAPTCHA servers

**Solutions:**
1. Check browser console for errors
2. Verify the Site Key in your environment variables
3. Ensure your domain is added in reCAPTCHA admin console
4. For localhost, make sure `localhost` is added as a domain

### Issue: "reCAPTCHA verification failed" error
**Possible causes:**
- `RECAPTCHA_SECRET_KEY` is not set or incorrect
- Token expired (tokens expire after ~2 minutes)
- Network issue reaching Google's verification API

**Solutions:**
1. Verify the Secret Key in your environment variables (server-side only)
2. Make sure the Secret Key matches the Site Key (they're from the same reCAPTCHA site)
3. Check server logs for detailed error messages
4. Try completing the reCAPTCHA again (tokens expire quickly)

### Issue: "reCAPTCHA not configured" warning
**This means:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is missing or empty
- The app will still work but without bot protection

**Solution:**
- Add the Site Key to your environment variables and restart/redeploy

### Issue: Works locally but not in production
**Possible causes:**
- Domain not added in reCAPTCHA admin console
- Environment variables not set in Vercel
- Need to redeploy after adding environment variables

**Solutions:**
1. Add your production domain to reCAPTCHA admin console
2. Verify environment variables are set in Vercel
3. Redeploy your application

---

## Step 5: Security Best Practices

### ✅ Do's:
- ✅ Use different keys for development and production (create separate reCAPTCHA sites)
- ✅ Keep Secret Key secure (never commit to git)
- ✅ Regularly monitor reCAPTCHA analytics in Google Admin Console
- ✅ Set up domain restrictions in reCAPTCHA admin console
- ✅ Monitor for suspicious activity

### ❌ Don'ts:
- ❌ Don't share your Secret Key publicly
- ❌ Don't use the same keys for multiple projects
- ❌ Don't bypass reCAPTCHA verification in production
- ❌ Don't ignore reCAPTCHA errors in logs

---

## Implementation Details

### What Was Implemented:

1. **Server-Side Verification** (`src/lib/recaptcha.ts`)
   - Verifies tokens with Google's API
   - Handles errors gracefully
   - Development mode bypass (if secret not set)

2. **Client-Side Integration**
   - Login page: reCAPTCHA widget above submit button
   - Signup page: reCAPTCHA widget before terms checkbox
   - Form validation prevents submission without reCAPTCHA
   - Error handling and user feedback

3. **API Route Protection**
   - `/api/check-user-status` (login) - Verifies reCAPTCHA
   - `/api/signup` - Verifies reCAPTCHA
   - Both return clear error messages if verification fails

4. **Validation Schemas**
   - `loginSchema` - Requires `recaptchaToken`
   - `signupSchema` - Requires `recaptchaToken`
   - Both are mandatory (not optional)

### Error Handling:
- Client-side: Shows error message if reCAPTCHA not completed
- Server-side: Returns 400 error with descriptive message
- Token expiration: Automatically clears and requires re-verification
- Network errors: Handled gracefully with user-friendly messages

---

## Testing Checklist

- [ ] reCAPTCHA widget appears on login page
- [ ] reCAPTCHA widget appears on signup page
- [ ] Cannot submit form without completing reCAPTCHA
- [ ] Error message shows if reCAPTCHA not completed
- [ ] Form submits successfully after completing reCAPTCHA
- [ ] Works in both English and Arabic locales
- [ ] Works on localhost (development)
- [ ] Works on production domain
- [ ] Token expiration handled correctly
- [ ] Error messages are user-friendly

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google reCAPTCHA documentation: https://developers.google.com/recaptcha/docs/display
3. Check browser console for client-side errors
4. Check server logs for server-side errors
5. Verify environment variables are set correctly

---

## Notes

- **reCAPTCHA v2 Checkbox** is used (not v3 or Invisible)
- Tokens expire after ~2 minutes - users need to complete again if they wait
- The implementation is production-ready with proper error handling
- Development mode allows bypass if secret key is not set (for local testing)
- All error messages are translatable (English/Arabic)

