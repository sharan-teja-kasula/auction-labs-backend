import { AuctionInput } from "../../types/interfaces";
import auctionController from "../../controllers/auction";

const resolvers: any = {};

resolvers.Mutation = {
  createAuction: async (
    _: any,
    { input }: { input: AuctionInput },
    { req }: { req: any }
  ) => {
    console.log(req.user);

    // Implement your create auction logic here
    const newAuction = await auctionController.createAuction(input);
    return newAuction;
  },
  updateAuctionStatus: async (
    _: any,
    { id, status }: { id: string; status: boolean }
  ) => {
    // Implement your update auction status logic here
    const updatedAuction = await auctionController.updateAuctionStatus(
      id,
      status
    );
    return updatedAuction;
  },
};

resolvers.Query = {
  getAuctions: async (
    _: any,
    { filter, limit, offset }: { filter: string; limit: number; offset: number }
  ) => {
    // Implement your get auctions logic here
    const auctions = await auctionController.getAuctions(filter, limit, offset);
    return auctions;
  },
};

export default resolvers;
