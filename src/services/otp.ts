import speakeasy from "speakeasy";
import NodeCache from "node-cache";
import sendEmail from "./nodemailer";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 330 });

import { EmailOptions, OTPStore } from "../types/interfaces";

const OTP = {
  checkOTP: (email: string, requestType: string, otp: string): boolean => {
    const uniqueId = email + requestType;

    if (cache.has(uniqueId)) {
      const otpStore = cache.get(uniqueId) as OTPStore;
      const { otpSecret } = otpStore;

      return speakeasy.totp.verify({
        secret: otpSecret,
        encoding: "base32",
        token: otp,
        window: 300,
      });
    }
    return false;
  },

  deleteOTP: (email: string, requestType: string): void => {
    const uniqueId = email + requestType;
    if (cache.has(uniqueId)) {
      cache.del(uniqueId);
    }
  },

  sendOTP: async (email: string, requestType: string): Promise<void> => {
    try {
      const uniqueId = email + requestType;

      const otpSecret = speakeasy.generateSecret({ length: 20 }).base32;
      const otp = speakeasy.totp({
        secret: otpSecret,
        encoding: "base32",
      });

      cache.set(uniqueId, { otpSecret });

      const subject = "OTP Verification from Auction Labs";
      const html = OTP.otpHtmlTemplate(otp);

      const emailOptions: EmailOptions = { to: email, subject, html };

      await sendEmail(emailOptions);
    } catch (err) {
      throw err;
    }
  },

  otpHtmlTemplate: (otp: string): string => {
    return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Auction Labs</title>
        <style type="text/css">
          body {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
            background-color: LightGray;
          }
          p {
              font-size: 14px;
              color: black;
          }
          b {
            font-size: 22px;
            color: black;
          }
          table {
            border-collapse: collapse;
          }
        </style>
      </head>
      <body>
          <table>
              <td>
                  <div style="padding: 30px;">
                      <p>Hi Customer!</p>
                      <p>Thank you for showing interest in Auction Labs.</p>
                      <p>Your OTP for Auction Labs verification is <b>${otp}</b>.</p>
                      <p>Please do not share it with anyone and OTP Expires in 5 minutes.</p>
                  </div>
              </td>
          </table>
      </body>
    </html>
    `;
  },
};

export default OTP;
