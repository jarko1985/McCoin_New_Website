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
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #07153B 0%, #1A0A2E 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <img src="https://mc-coin-new-website.vercel.app/images/logo1.png" alt="McCoin Logo" style="max-width: 150px; margin-bottom: 20px;">
        <h1 style="color: #07153B; margin-bottom: 20px;">Welcome to McCoin!</h1>
        <p style="color: #07153B; font-size: 16px; margin-bottom: 30px;">
          Thank you for creating your McCoin account. To complete your registration and start trading crypto assets, please verify your email address.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; background-color: #EC3B3B; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; margin-bottom: 20px;">
          Verify Email Address
        </a>
        <p style="color: #07153B; font-size: 14px; margin-top: 30px;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="color: #EC3B3B; font-size: 14px; word-break: break-all;">
          ${verifyUrl}
        </p>
        <p style="color: #07153B; font-size: 12px; margin-top: 30px;">
          This verification link will expire in 24 hours. If you didn't create a McCoin account, please ignore this email.
        </p>
      </div>
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
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #07153B 0%, #1A0A2E 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <img src="https://mc-coin-new-website.vercel.app/images/logo1.png" alt="McCoin Logo" style="max-width: 150px; margin-bottom: 20px;">
        <h1 style="color: #07153B; margin-bottom: 20px;">Reset Your Password</h1>
        <p style="color: #07153B; font-size: 16px; margin-bottom: 30px;">
          We received a request to reset your McCoin account password. Click the button below to set a new password.
        </p>
        <a href="${resetUrl}" style="display: inline-block; background-color: #EC3B3B; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; margin-bottom: 20px;">
          Reset Password
        </a>
        <p style="color: #07153B; font-size: 14px; margin-top: 30px;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="color: #EC3B3B; font-size: 14px; word-break: break-all;">
          ${resetUrl}
        </p>
        <p style="color: #07153B; font-size: 12px; margin-top: 30px;">
          This password reset link will expire in 1 hour. If you didn't request a password reset, please ignore this email and your password will remain unchanged.
        </p>
      </div>
    </body>
    </html>
  `;

  await sendEmailViaGraph(email, 'Reset Your McCoin Password', emailContent);
}
