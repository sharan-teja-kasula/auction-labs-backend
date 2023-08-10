import express from "express";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { routeHandler as routeValidator } from "./express_config/routes.validator";
import { loadAppRoutes } from "./express_config/routes.loader";

export default (app: express.Application, apolloServer: any): void => {
  const corsOptions: cors.CorsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app.use(cors(corsOptions));
  app.use(compression());

  app.use(express.text({ limit: "5mb" }));
  app.use(express.json({ limit: "5mb" }));

  app.use(express.urlencoded({ limit: "5mb", extended: false }));

  app.use(rateLimit({ windowMs: 60 * 60 * 1000, max: 10000 }));

  app.use((req, res, next) => routeValidator(req, res, next));
  loadAppRoutes(app, apolloServer);
};
