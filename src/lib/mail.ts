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
  // Create verification URL with both token and email parameters
  const verifyUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  }/en/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

  const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your McCoin Account</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
        <tr>
          <td align="center" style="padding: 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="background: linear-gradient(135deg, #07153B 0%, #1A0A2E 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                  <img src="https://mc-coin-new-website.vercel.app/images/logo1.png" alt="McCoin Logo" style="max-width: 150px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;">
                  <h1 style="color: #07153B; margin-bottom: 20px; font-size: 28px; margin-top: 0;">Welcome to McCoin!</h1>
                  <p style="color: #07153B; font-size: 16px; margin-bottom: 30px; margin-top: 0;">
                    Thank you for creating your McCoin account. To complete your registration and start trading crypto assets, please verify your email address.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                    <tr>
                      <td style="background-color: #EC3B3B; border-radius: 8px; text-align: center;">
                        <a href="${verifyUrl}" style="display: inline-block; padding: 15px 30px; color: #07153B; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px; background-color: #EC3B3B;">
                          Verify Email Address
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color: #666; font-size: 14px; margin-top: 30px; margin-bottom: 10px;">
                    If the button doesn't work, copy and paste this link into your browser:
                  </p>
                  <p style="color: #EC3B3B; font-size: 14px; word-break: break-all; margin-bottom: 30px;">
                    <a href="${verifyUrl}" style="color: #EC3B3B;">${verifyUrl}</a>
                  </p>
                  
                  <p style="color: #666; font-size: 12px; margin-top: 30px; margin-bottom: 0;">
                    This verification link will expire in 24 hours. If you didn't create a McCoin account, please ignore this email.
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
