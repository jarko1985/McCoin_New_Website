import { NextRequest, NextResponse } from "next/server";
import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";
import { Readable } from "stream";
import formidable from "formidable";
import fs from "fs";
import type { IncomingMessage } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

// MS365 Auth
const credential = new ClientSecretCredential(
  process.env.MICROSOFT_TENANT_ID!,
  process.env.MICROSOFT_CLIENT_ID!,
  process.env.MICROSOFT_CLIENT_SECRET!
);

// Helper: Convert Web ReadableStream to Node.js Readable
function webReadableStreamToNodeReadable(
  webStream: ReadableStream<Uint8Array>
): Readable {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(Buffer.from(value));
      }
    },
  });
}

// Convert NextRequest to IncomingMessage
async function convertRequest(req: NextRequest): Promise<IncomingMessage> {
  const nodeReadable = webReadableStreamToNodeReadable(req.body!);
  const incoming = Object.assign(nodeReadable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: "",
  }) as unknown as IncomingMessage;

  return incoming;
}

export async function POST(req: NextRequest) {
  try {
    const stream = await convertRequest(req);
    const form = formidable({ multiples: false });

    const [fields, files] = await new Promise<any>((resolve, reject) => {
      form.parse(stream, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const resumeFile = Array.isArray(files.resume)
      ? files.resume[0]
      : files.resume;

    if (!resumeFile || !resumeFile.filepath) {
      return NextResponse.json(
        { error: "Resume file is missing or invalid." },
        { status: 400 }
      );
    }

    const resumeContent = fs.readFileSync(resumeFile.filepath);
    const resumeBase64 = resumeContent.toString("base64");

    // Microsoft Graph Access Token
    const accessToken = await credential.getToken(
      "https://graph.microsoft.com/.default"
    );
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken.token);
      },
    });

    // Email body
    const emailContent = `
      <p><strong>Full Name:</strong> ${fields.fullName}</p>
      <p><strong>Email:</strong> ${fields.email}</p>
      <p><strong>Phone:</strong> ${fields.phone}</p>
      <p><strong>Visa Status:</strong> ${fields.visaStatus}</p>
      <p><strong>Salary Expectations:</strong> ${fields.salaryExpectations}</p>
      <p><strong>Availability:</strong> ${fields.availability}</p>
    `;

    const message = {
      message: {
        subject: "New Job Application",
        body: {
          contentType: "HTML",
          content: emailContent,
        },
        toRecipients: [
          {
            emailAddress: {
              address: "info@mccoin.com",
            },
          },
        ],
        attachments: [
          {
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: resumeFile.originalFilename,
            contentBytes: resumeBase64,
          },
        ],
      },
      saveToSentItems: true,
    };

    // Send email
    await client
      .api(`/users/${process.env.MICROSOFT_SENDER_EMAIL}/sendMail`)
      .post(message);

    return NextResponse.json({
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send application." },
      { status: 500 }
    );
  }
}
