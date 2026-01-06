import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Handle Prisma errors
  if (err.name === "PrismaClientKnownRequestError") {
    return res.status(400).json({
      success: false,
      message: "Database operation failed",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(422).json({
      success: false,
      message: err.message,
    });
  }

  // Default error response
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

