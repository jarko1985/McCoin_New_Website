import { NextResponse } from 'next/server';
import { sendContactFormEmail, sendContactAcknowledgmentEmail } from '@/lib/mail';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas';
import logger from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    
    // Re-validate on server using shared schema (sanitization happens in transform)
    const validatedData = contactFormSchema.safeParse(body);

    if (!validatedData.success) {
      logger.warn({ errors: validatedData.error.flatten() }, 'Contact form validation failed');
      return NextResponse.json({ error: validatedData.error.flatten() }, { status: 400 });
    }

    // Data is already sanitized by the schema transform
    const { name, email, phone, subject, message }: ContactFormData = validatedData.data;

    // Send the contact form email to admin
    await sendContactFormEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send acknowledgment email to the user
    try {
      await sendContactAcknowledgmentEmail({
        name,
        email,
        phone,
        subject,
        message,
      });
    } catch (acknowledgmentError) {
      console.error('Error sending acknowledgment email:', acknowledgmentError);
      // Don't fail the contact form submission if acknowledgment email fails
      // Just log the error and continue
    }

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Full error:', error);

    // Handle SMTP-specific errors
    if (error.responseCode) {
      return NextResponse.json(
        {
          error: 'SMTP Error',
          details: {
            code: error.responseCode,
            message: error.response,
          },
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error.message,
      },
      { status: 500 },
    );
  }
}
