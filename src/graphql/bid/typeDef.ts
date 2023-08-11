const typeDefs = `#graphql
type Bid {
  id: ID!
  user_id: Int!
  displayname: String!
  email: String!
  auction_id: String!
  bid_amount: Float!
  bid_time: String!
}

input BidInput {
  auction_id: Int!
  bid_amount: Float!
}

type Mutation {
  createBid(input: BidInput!): Bid!
}

type Query {
  getBids(auction_id: Int, limit: Int, offset: Int, sortby: String, sortorder: String): [Bid!]!
}
`;

export default typeDefs;
