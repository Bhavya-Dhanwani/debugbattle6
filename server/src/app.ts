import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import routes from "./routes";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import { apiReference } from "@scalar/express-api-reference";
import swaggerSpec from "./config/swagger";

const app: Application = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(["/docs.json", "/openapi.json", "/api-docs.json"], (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(
  "/docs",
  apiReference({
    showDeveloperTools: "never",
    spec: {
      content: swaggerSpec,
    },
  })
);

app.use("/api", routes);

// Serve static assets from frontend build
app.use(express.static(path.join(__dirname, "../../client/dist")));

// Wildcard SPA route to serve index.html for client-side routing (excluding api and docs)
app.get("*", (req: Request, res: Response, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/docs")) {
    return next();
  }
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.use(notFound);
app.use(errorHandler);

export default app;
