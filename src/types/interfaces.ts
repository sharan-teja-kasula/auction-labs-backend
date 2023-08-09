import mongoose from "mongoose";

export interface JwtUserInfo {
  _id: mongoose.Types.ObjectId;
  displayName: string;
  email: string;
  isAdmin: string;
}

export interface OTPStore {
  otpSecret: string;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}
