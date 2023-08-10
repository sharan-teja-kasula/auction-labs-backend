const typeDefs = `#graphql
type Auction {
  id: ID!
  title: String!
  description: String!
  category: String!
  imageurl: String!
  start_time: String!
  end_time: String!
  current_bid_amount: Float!
  user_id: Int!
  status: Boolean!
}

input AuctionInput {
  title: String!
  description: String!
  category: String!
  imageurl: String!
  start_time: String!
  end_time: String!
}

type Mutation {
  createAuction(input: AuctionInput!): Auction!
  updateAuctionStatus(id: ID!, status: Boolean!): Auction!
}

type Query {
  getAuctions(filter: String, limit: Int, offset: Int): [Auction!]!
}
`;

export default typeDefs;
