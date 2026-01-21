import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { email, subject, emailType } = await req.json();
    let pdfLink = '';
    let templatePath = '';
    if (emailType === 'FirstFirst-Chapter') {
      pdfLink = `${process.env.BASE_URL}/pdfs/chapter-one.pdf`;

      templatePath = path.join(
        process.cwd(),
        "emails/free-ebook.html"
      );

    } else {
      const parts = emailType.split("*");
      //const productType = parts[0] ?? "";
      const transactionIdValue = parts[1] ?? "";
      templatePath = path.join(
        process.cwd(),
        "emails/full-book.html"
      );
      pdfLink = `${process.env.BASE_URL}?token=${transactionIdValue}`      
    }
   
    let html = fs.readFileSync(templatePath, "utf8");
    html = html.replace("{{PDF_LINK}}", pdfLink);

    await sendEmail({
      to: email,
      subject: subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
