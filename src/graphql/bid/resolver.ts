import { BidInput } from "../../types/interfaces";
import bidController from "../../controllers/bid";

const resolvers: any = {};

resolvers.Mutation = {
  createBid: async (
    _: any,
    { input }: { input: BidInput },
    { req }: { req: any }
  ) => {
    const newBid = await bidController.createBid(input, req.user);
    return newBid;
  },
};

resolvers.Query = {
  getBids: async (
    _: any,
    {
      auction_id,
      limit,
      offset,
      sortby,
      sortorder,
    }: {
      auction_id: Number;
      limit: number;
      offset: number;
      sortby: string;
      sortorder: "asc" | "desc";
    }
  ) => {
    const auctions = await bidController.getBids(
      auction_id,
      limit,
      offset,
      sortby,
      sortorder
    );
    return auctions;
  },
};

export default resolvers;
