import { mergeResolvers } from "@graphql-tools/merge";
import auctionResolver from "./auction/resolver";
import bidResolver from "./bid/resolver";

const combinedResolvers = mergeResolvers([auctionResolver, bidResolver]);

export default combinedResolvers;
