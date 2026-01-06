import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Task Manager API",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api", routes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;
