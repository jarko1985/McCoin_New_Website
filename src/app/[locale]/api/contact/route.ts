import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactFormEmail, sendContactAcknowledgmentEmail } from '@/lib/mail';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type FormData = z.infer<typeof formSchema>;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validatedData = formSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: validatedData.error.flatten() }, { status: 400 });
    }

    const { name, email, phone, subject, message }: FormData = validatedData.data;

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
      // Don't fail the contact form submission if acknowledgment email fails
      // Error handled silently
    }

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error: any) {
    // Handle SMTP-specific errors
    if (error.responseCode) {
      return NextResponse.json(
        {
          error: 'SMTP Error',
          details: {
            code: error.responseCode,
            message: 'Email service error',
          },
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to send email',
      },
      { status: 500 },
    );
  }
}
