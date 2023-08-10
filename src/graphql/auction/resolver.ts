import { AuctionInput } from "../../types/interfaces";
import auctionController from "../../controllers/auction";

const resolvers: any = {};

resolvers.Mutation = {
  createAuction: async (
    _: any,
    { input }: { input: AuctionInput },
    { req }: { req: any }
  ) => {
    const { title, description, category, imageurl, start_time, end_time } =
      input;

    if (title.length < 3) throw new Error("Title minimum length is 3!");

    if (description.length < 3)
      throw new Error("Description minimum length is 3!");

    if (category.length < 3) throw new Error("Category minimum length is 3!");

    if (imageurl.length < 3) throw new Error("Imageurl minimum length is 3!");

    const startTime: any = new Date(start_time);
    const endTime: any = new Date(end_time);

    if (isNaN(startTime) || isNaN(endTime))
      throw new Error("Invalid date format!");

    if (startTime >= endTime)
      throw new Error("End time must be after start time!");

    const newAuction = await auctionController.createAuction(
      input,
      req.user.id
    );
    return newAuction;
  },

  updateAuctionStatus: async (
    _: any,
    { id, status }: { id: Number; status: boolean },
    { req }: { req: any }
  ) => {
    const updatedAuction = await auctionController.updateAuctionStatus(
      id,
      status,
      req.user.id
    );
    return updatedAuction;
  },
};

resolvers.Query = {
  getAuctions: async (
    _: any,
    { filter, limit, offset }: { filter: string; limit: number; offset: number }
  ) => {
    const auctions = await auctionController.getAuctions(filter, limit, offset);
    return auctions;
  },
};

export default resolvers;
