import { Request, Response } from "express";
import { taskService } from "../services";
import { asyncHandler } from "../utils";
import { TaskQueryParams } from "../types";
import { TaskStatus, TaskPriority } from "@prisma/client";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

export const getAllTasks = asyncHandler(async (req: Request, res: Response) => {
  const query: TaskQueryParams = {
    status: req.query.status as TaskStatus | undefined,
    priority: req.query.priority as TaskPriority | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
    sortBy: req.query.sortBy as TaskQueryParams["sortBy"],
    sortOrder: req.query.sortOrder as TaskQueryParams["sortOrder"],
  };

  const result = await taskService.getAllTasks(query);

  res.status(200).json({
    success: true,
    ...result,
  });
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(req.params.id);

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await taskService.updateTask(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await taskService.deleteTask(req.params.id);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

export const getTaskStats = asyncHandler(
  async (_req: Request, res: Response) => {
    const stats = await taskService.getTaskStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  }
);

