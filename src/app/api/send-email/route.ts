import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
//import { sendEmail } from "@/lib/resend";
import fs from "fs";
import path from "path";
import { saveTransactionWithCheck } from "@/lib/subscribedEmails";

export async function POST(req: Request) {
  try {
    
    const { email, subject, emailType } = await req.json();

    let pdfLink = "";
    let templatePath = "";

    if (emailType === "First-Chapter") {
      pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

      // Save only for First-Chapter
      await saveTransactionWithCheck({
        email,
        subscribe_status: true,
        created_at: new Date().toISOString(),
      });

      templatePath = path.join(
        process.cwd(),
        "emails/free-ebook.html"
      );
    } else {
      const parts = emailType.split("*");
      const transactionIdValue = parts[1] ?? "";

      templatePath = path.join(
        process.cwd(),
        "emails/full-book.html"
      );
      pdfLink = `${process.env.BASE_URL}?token=${transactionIdValue}`;
    }

    // Ensure templatePath is set
    if (!templatePath) {
      throw new Error("EMAIL_TEMPLATE_NOT_FOUND");
    }

    const html = fs
      .readFileSync(templatePath, "utf8")
      .replace("{{PDF_LINK}}", pdfLink);
   
    //Send email with Resend
    await sendEmail({
      to: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
