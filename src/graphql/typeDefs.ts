import { mergeTypeDefs } from "@graphql-tools/merge";
import auctionTypeDef from "./auction/typeDef";
import bidTypeDef from "./bid/typeDef";

const combinedTypeDefs = mergeTypeDefs([auctionTypeDef, bidTypeDef]);

export default combinedTypeDefs;
