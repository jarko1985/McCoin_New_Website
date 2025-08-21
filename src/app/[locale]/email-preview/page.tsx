'use client';

import { useEffect, useState } from 'react';

export default function EmailPreviewPage() {
  const [emailHtml, setEmailHtml] = useState('');

  useEffect(() => {
    // Generate the email content with test data
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const testEmail = 'test@example.com';
    const testToken = 'test-token-123';

    const verifyUrl = `${baseUrl}/en/verify-email?token=${testToken}&email=${encodeURIComponent(
      testEmail,
    )}`;
    const logoUrl = `${baseUrl}/images/mccoin_logo_light.png`;
    const envelopeUrl = `${baseUrl}/images/email_icon.png`;
    const newsUrl = `${baseUrl}/news`;
    const aboutUrl = `${baseUrl}/about`;
    const resourcesUrl = `${baseUrl}/resources`;
    const contactUrl = `${baseUrl}/contact`;
    const shareUrl = `${baseUrl}/share`;
    const siteUrl = baseUrl;
    const unsubUrl = `${baseUrl}/unsubscribe`;

    const emailContent = `
<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Confirmation</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style>
    html, body { margin:0 !important; padding:0 !important; height:100% !important; width:100% !important; }
    img { border:0; line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    table { border-collapse:collapse !important; }
    a { text-decoration:underline; }
    @media screen and (max-width: 660px) {
      .container { width:100% !important; }
      .px-24 { padding-left:24px !important; padding-right:24px !important; }
    }
  </style>
</head>
<body style="background-color:#f4f4f4; margin:0; padding:0;">
  <center role="article" aria-roledescription="email" lang="en" style="width:100%; background-color:#f4f4f4;">
    <table role="presentation" width="100%" bgcolor="#f4f4f4" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:20px;">
          <table role="presentation" class="container" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            
            <!-- Header with logo -->
            <tr>
              <td bgcolor="#DAE6EA" style="padding:24px; border-radius:8px 8px 0 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td align="left" valign="middle">
                      <a href="${siteUrl}" target="_blank" style="display:inline-block;">
                        <img src="${logoUrl}" width="120" alt="McCoin" style="display:block; height:auto;">
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Hero icon section -->
            <tr>
              <td bgcolor="#DAE6EA" align="center" style="padding:32px 24px 24px;">
                <img src="${envelopeUrl}" width="80" alt="Email Icon" style="display:block; height:auto; margin-bottom:16px;">
                <div style="font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:bold; color:#07153B; margin:0;">
                  Account Confirmation!
                </div>
              </td>
            </tr>

            <!-- Main content section -->
            <tr>
              <td bgcolor="#ffffff" class="px-24" style="padding:32px 24px;">
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; color:#334155; margin:0 0 16px 0;">
                  Hi ${testEmail}, welcome to McCoin! Please verify your email address to finish setting up your account and keep it secure.
                </p>
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; color:#334155; margin:0 0 24px 0;">
                  This verification link expires in <strong>24 hours</strong>. If it expires, you can request a new one from the sign-in page.
                </p>
                
                <!-- CTA Button -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:0 0 24px 0;">
                  <tr>
                    <td align="center" bgcolor="#07153B" style="border-radius:8px;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${verifyUrl}"
                        style="height:48px;v-text-anchor:middle;width:200px;" arcsize="12%" stroke="f" fillcolor="#07153B">
                        <w:anchorlock/>
                        <center style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;">
                          Confirm Account
                        </center>
                      </v:roundrect>
                      <![endif]-->
                      <!--[if !mso]><!-- -->
                      <a href="${verifyUrl}"
                         style="background-color:#07153B; border:1px solid #07153B; border-radius:8px; color:#ffffff; display:inline-block; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; line-height:48px; text-align:center; text-decoration:none; width:200px; -webkit-text-size-adjust:none; mso-hide:all;">
                        Confirm Account
                      </a>
                      <!--<![endif]-->
                    </td>
                  </tr>
                </table>

                <!-- Fallback link -->
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#666; margin:0 0 8px 0;">
                  If the button doesn't work, copy and paste this link into your browser:
                </p>
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:14px; word-break:break-all; margin:0;">
                  <a href="${verifyUrl}" style="color:#EC3B3B;">${verifyUrl}</a>
                </p>
              </td>
            </tr>

            <!-- Info section -->
            <tr>
              <td bgcolor="#DAE6EA" class="px-24" style="padding:24px; border-radius:0 0 8px 8px;">
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; color:#07153B; margin:0 0 12px 0;">
                  ⚠️ By confirming this account you will be joining a community of like minded McCoinners to explore and experience "everything crypto in McCoin".
                </p>
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; color:#07153B; margin:0 0 12px 0;">
                  🐘 Invite your friends to our community and earn credits to win gifts
                </p>
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; margin:0 0 16px 0;">
                  <a href="${shareUrl}" style="color:#EC3B3B; font-weight:bold;">Share with Friends</a>
                </p>

                <!-- Navigation links -->
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.8; color:#07153B; margin:0 0 20px 0;">
                  <a href="${newsUrl}" style="color:#07153B; text-decoration:underline;">News</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="${aboutUrl}" style="color:#07153B; text-decoration:underline;">About us</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="${resourcesUrl}" style="color:#07153B; text-decoration:underline;">Resources</a>
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <a href="${contactUrl}" style="color:#07153B; text-decoration:underline;">Contact us</a>
                </p>

                <!-- Social Media Icons -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px 0;">
                  <tr>
                    <td align="center">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <!-- Facebook -->
                          <td style="padding:0 8px;">
                            <a href="https://facebook.com/mccoin" target="_blank" style="display:inline-block; width:32px; height:32px; background-color:#1877F2; border-radius:50%; text-align:center; line-height:32px; text-decoration:none;">
                              <span style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;">f</span>
                            </a>
                          </td>
                          <!-- Twitter/X -->
                          <td style="padding:0 8px;">
                            <a href="https://twitter.com/mccoin" target="_blank" style="display:inline-block; width:32px; height:32px; background-color:#000000; border-radius:50%; text-align:center; line-height:32px; text-decoration:none;">
                              <span style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;">𝕏</span>
                            </a>
                          </td>
                                                     <!-- Instagram -->
                           <td style="padding:0 8px;">
                             <a href="https://instagram.com/mccoin" target="_blank" style="display:inline-block; width:32px; height:32px; background:linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); border-radius:50%; text-align:center; line-height:32px; text-decoration:none;">
                               <span style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:18px; font-weight:bold;">📱</span>
                             </a>
                           </td>
                          <!-- LinkedIn -->
                          <td style="padding:0 8px;">
                            <a href="https://linkedin.com/company/mccoin" target="_blank" style="display:inline-block; width:32px; height:32px; background-color:#0077B5; border-radius:50%; text-align:center; line-height:32px; text-decoration:none;">
                              <span style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;">in</span>
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:16px 0;">
                  <tr><td style="border-bottom:1px solid #cbd5e1; line-height:0; font-size:0;">&nbsp;</td></tr>
                </table>

                <!-- Footer links -->
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; color:#6b6f76; margin:0 0 6px 0;">
                  You have received this email because you are a subscriber of
                  <a href="${siteUrl}" style="color:#07153B; text-decoration:underline;">this site</a>.
                </p>
                <p style="font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:1.6; color:#6b6f76; margin:0;">
                  If you feel you received it by mistake or wish to unsubscribe,
                  <a href="${unsubUrl}" style="color:#07153B; text-decoration:underline;">click here</a>.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
    `;

    setEmailHtml(emailContent);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Template Preview</h1>
          <p className="text-gray-600">
            This is how the verification email template will look when sent to users.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h2 className="text-sm font-medium text-gray-700">Email Preview</h2>
          </div>
          <div className="p-4" dangerouslySetInnerHTML={{ __html: emailHtml }} />
        </div>
      </div>
    </div>
  );
}
