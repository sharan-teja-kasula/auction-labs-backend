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
  imageurl: string;
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
  imageurl: string;
  start_time: Date;
  end_time: Date;
}

export interface Bid {
  id: Number;
  displayname: string;
  email: string;
  auction_id: string;
  bid_amount: Number;
  bid_time: string;
}

export interface BidInput {
  auction_id: Number;
  bid_amount: Number;
}
