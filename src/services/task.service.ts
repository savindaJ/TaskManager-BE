import prisma from "../lib/prisma";
import { NotFoundError } from "../utils";
import {
  CreateTaskInput,
  UpdateTaskInput,
  TaskQueryParams,
  PaginatedResponse,
} from "../types";
import { Task } from "@prisma/client";

export class TaskService {
  async createTask(data: CreateTaskInput): Promise<Task> {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        dueDate: data.dueDate,
        tags: data.tags || [],
      },
    });
  }

  async getAllTasks(query: TaskQueryParams): Promise<PaginatedResponse<Task>> {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query; // object destructuring

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      data: tasks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }

    return task;
  }

  async updateTask(id: string, data: UpdateTaskInput): Promise<Task> {
    // Check if task exists
    await this.getTaskById(id);

    return prisma.task.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.status && { status: data.status }),
        ...(data.priority && { priority: data.priority }),
        ...(data.dueDate !== undefined && { dueDate: data.dueDate }),
        ...(data.tags && { tags: data.tags }),
      },
    });
  }

  async deleteTask(id: string): Promise<Task> {
    // Check if task exists
    await this.getTaskById(id);

    return prisma.task.delete({
      where: { id },
    });
  }

  async getTaskStats() {
    const [total, byStatus, byPriority] = await Promise.all([
      prisma.task.count(),
      prisma.task.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
      prisma.task.groupBy({
        by: ["priority"],
        _count: { priority: true },
      }),
    ]);

    return {
      total,
      byStatus: byStatus.reduce(
        (acc, item) => {
          acc[item.status] = item._count.status;
          return acc;
        },
        {} as Record<string, number>
      ),
      byPriority: byPriority.reduce(
        (acc, item) => {
          acc[item.priority] = item._count.priority;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  }
}

export const taskService = new TaskService();

