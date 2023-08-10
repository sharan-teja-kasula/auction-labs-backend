import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

import authRoutes from "../../src/routes/auth";

const baseSecurityUrl = "/api";

export const loadAppRoutes = (
  app: express.Application,
  apolloServer: any
): void => {
  app.use("/authentication", authRoutes);
  app.use(
    baseSecurityUrl + "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req }),
    })
  );
};
