import { mergeTypeDefs } from "@graphql-tools/merge";
import auctionTypeDef from "./auction/typeDef";

const combinedTypeDefs = mergeTypeDefs([auctionTypeDef]);

export default combinedTypeDefs;
