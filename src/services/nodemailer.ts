import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { GMAIL_USER, GMAIL_PASS } = process.env;

import { EmailOptions } from "../types/interfaces";

const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: GMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
