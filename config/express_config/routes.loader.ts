import express from "express";
import authRoutes from "../../src/routes/auth";
// import userRoutes from "../../src/routes/user";

const baseSecurityUrl = "/api";

export const loadAppRoutes = (app: express.Application): void => {
  app.use("/authentication", authRoutes);
  // app.use(baseSecurityUrl + "/user", userRoutes);
};
