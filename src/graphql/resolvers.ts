import { mergeResolvers } from "@graphql-tools/merge";
import auctionResolver from "./auction/resolver";

const combinedResolvers = mergeResolvers([auctionResolver]);

export default combinedResolvers;
