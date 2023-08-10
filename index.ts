import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import configExpress from "./config/express";

import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";

import express from "express";
const app = express();

const startApplication = async () => {
  try {
    // Create http and apollo server
    const httpServer = require("http").createServer(app);
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await apolloServer.start();

    configExpress(app, apolloServer);

    // Start the app to listen port 4500
    const port = Number(process.env.PORT || 4500);

    httpServer.listen(port);
    httpServer.on("listening", () => {
      console.log("Server Running on Port  -->  " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

startApplication();
