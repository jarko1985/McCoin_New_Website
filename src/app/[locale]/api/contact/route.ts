import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 characters."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormData = z.infer<typeof formSchema>;

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MICROSOFT_EMAIL_USER,
    pass: process.env.MICROSOFT_EMAIL_PASSWORD,
  },
  tls: {
    minVersion: "TLSv1.2",
    ciphers: "TLS_AES_256_GCM_SHA384",
  },
  debug: true,
  logger: true
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const validatedData = formSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message }: FormData = validatedData.data;
    const mailOptions = {
      from: `"McCoin Contact Form" <${process.env.MICROSOFT_EMAIL_USER}>`,
      to: "info@mccoin.com",
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Test the SMTP connection first
    await transporter.verify();

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Full error:", error);

    // Handle SMTP-specific errors
    if (error.responseCode) {
      return NextResponse.json(
        { 
          error: "SMTP Error",
          details: {
            code: error.responseCode,
            message: error.response
          }
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { 
        error: "Failed to send email",
        details: error.message 
      },
      { status: 500 }
    );
  }
}