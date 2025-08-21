import { ConfidentialClientApplication } from '@azure/msal-node';

// Initialize MSAL client for OAuth 2.0
const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
  },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

// Function to get access token for Microsoft Graph
async function getAccessToken(): Promise<string> {
  try {
    const result = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });

    if (!result?.accessToken) {
      throw new Error('Failed to acquire access token');
    }

    return result.accessToken;
  } catch (error) {
    console.error('Error acquiring access token:', error);
    throw error;
  }
}

// Function to send email using Microsoft Graph API
async function sendEmailViaGraph(to: string, subject: string, htmlContent: string) {
  const accessToken = await getAccessToken();

  const emailData = {
    message: {
      subject: subject,
      body: {
        contentType: 'HTML',
        content: htmlContent,
      },
      toRecipients: [
        {
          emailAddress: {
            address: to,
          },
        },
      ],
    },
    saveToSentItems: true,
  };

  const response = await fetch(
    'https://graph.microsoft.com/v1.0/users/' + process.env.SMTP_USER + '/sendMail',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to send email: ${response.status} ${response.statusText} - ${errorText}`,
    );
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const verifyUrl = `${baseUrl}/en/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  // Assets must be absolute URLs for email clients
  const logoUrl = `${baseUrl}/images/mccoin_logo_light.png`;
  const envelopeUrl = `${baseUrl}/images/email_icon.png`; // <- add this asset or change path

  const newsUrl = `${baseUrl}/top-news`;
  const aboutUrl = `${baseUrl}/about`;
  const resourcesUrl = `${baseUrl}/privacy-policy`;
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
                  Hi ${email}, welcome to McCoin! Please verify your email address to finish setting up your account and keep it secure.
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
                    <td></td>
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

  await sendEmailViaGraph(
    email,
    'Verify Your McCoin Account - Complete Your Registration',
    emailContent,
  );
}

export async function sendPasswordResetEmail(email: string, token: string) {
  // Create password reset URL
  const resetUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }/en/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

  const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your McCoin Password</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #07153B 0%, #1A0A2E 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                  <img src="https://mc-coin-new-website.vercel.app/images/logo1.png" alt="McCoin Logo" style="max-width: 150px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">
                  <h1 style="color: #07153B; margin-bottom: 20px; font-size: 28px; margin-top: 0;">Reset Your Password</h1>
                  <p style="color: #07153B; font-size: 16px; margin-bottom: 30px; margin-top: 0;">
                    We received a request to reset your McCoin account password. Click the button below to set a new password.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="background-color: #EC3B3B; border-radius: 8px; text-align: center;">
                        <a href="${resetUrl}" style="display: inline-block; padding: 15px 30px; color: #07153B; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px; background-color: #EC3B3B;">
                          Reset Password
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color: #666; font-size: 14px; margin-top: 30px; margin-bottom: 10px;">
                    If the button doesn't work, copy and paste this link into your browser:
                  </p>
                  <p style="color: #EC3B3B; font-size: 14px; word-break: break-all; margin-bottom: 30px;">
                    <a href="${resetUrl}" style="color: #EC3B3B;">${resetUrl}</a>
                  </p>
                  
                  <p style="color: #666; font-size: 12px; margin-top: 30px; margin-bottom: 0;">
                    This password reset link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmailViaGraph(email, 'Reset Your McCoin Password', emailContent);
}

export async function sendContactFormEmail(formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const { name, email, phone, subject, message } = formData;

  const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - McCoin</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #07153B 0%, #1A0A2E 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                  <img src="https://mc-coin-new-website.vercel.app/images/logo1.png" alt="McCoin Logo" style="max-width: 150px; margin-bottom: 20px; display: block;">
                  <h1 style="color: #EC3B3B; margin-bottom: 20px; font-size: 28px; margin-top: 0;">New Contact Form Submission</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 20px;">
                        <h2 style="color: #EC3B3B; margin-bottom: 15px; font-size: 20px;">Contact Details</h2>
                        <p style="color: #333; margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
                        <p style="color: #333; margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #EC3B3B;">${email}</a></p>
                        <p style="color: #333; margin-bottom: 10px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #EC3B3B;">${phone}</a></p>
                        <p style="color: #333; margin-bottom: 10px;"><strong>Subject:</strong> ${subject}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px;">
                    <tr>
                      <td style="padding: 20px;">
                        <h2 style="color: #EC3B3B; margin-bottom: 15px; font-size: 20px;">Message</h2>
                        <p style="color: #333; line-height: 1.8;">${message.replace(
                          /\n/g,
                          '<br>',
                        )}</p>
                      </td>
                    </tr>
                  </table>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; border-top: 1px solid #e9ecef;">
                    <tr>
                      <td style="padding-top: 20px;">
                        <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
                          <strong>Submission Time:</strong> ${new Date().toLocaleString()}
                        </p>
                        <p style="color: #666; font-size: 14px; margin-bottom: 0;">
                          This message was sent from the McCoin website contact form.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmailViaGraph(
    process.env.CONTACT_EMAIL || 'dev@mccoin.com',
    `New Contact Form Submission: ${subject}`,
    emailContent,
  );
}
