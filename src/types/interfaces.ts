export interface JwtUserInfo {
  id: Number;
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

export interface Auction {
  id: Number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  start_time: Date;
  end_time: Date;
  current_bid_amount: Number;
  user_id: Number;
  status: Boolean;
}

export interface AuctionInput {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  start_time: Date;
  end_time: Date;
}
