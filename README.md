# 🧩 Task Manager Backend API

A **production-ready Task Management REST API** built with **TypeScript**, **Express.js**, **Prisma ORM**, and **MongoDB**.  
This project is designed to showcase **modern backend development skills**, including clean architecture, Prisma with MongoDB, centralized error handling, and scalable API design.

👨‍💻 **Author:** Savinda Jayasekara  
🔗 **GitHub:** [github.com/savindaJ](https://github.com/savindaJ)

---

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) Tasks
- 📊 Task Statistics API
- 🔍 Search, Filter & Pagination
- 🧠 Prisma ORM with MongoDB Adapter
- 🛡 Centralized Error Handling Middleware
- 🧱 Layered Architecture (Controller → Service → DB)
- 🔐 Environment-based Configuration
- 🧪 Fully Type-safe with TypeScript
- 📁 Clean & Scalable Project Structure

---

## 🛠 Tech Stack

| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **TypeScript** | Type-safe JavaScript |
| **Prisma ORM** | Database ORM |
| **MongoDB Atlas** | Cloud database |
| **dotenv** | Environment variables |

---

## 📂 Project Structure

```bash
taskmanager-be/
├── prisma/
│   └── schema.prisma      # Database schema & models
├── src/
│   ├── config/            # Environment & server configuration
│   │   └── index.ts
│   ├── controllers/       # HTTP request handlers
│   │   ├── index.ts
│   │   └── task.controller.ts
│   ├── lib/               # Prisma client initialization
│   │   └── prisma.ts
│   ├── middleware/        # Error handling & validation
│   │   ├── index.ts
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── routes/            # API route definitions
│   │   ├── index.ts
│   │   └── task.routes.ts
│   ├── services/          # Business logic & database queries
│   │   ├── index.ts
│   │   └── task.service.ts
│   ├── types/             # TypeScript interfaces & types
│   │   ├── index.ts
│   │   └── task.types.ts
│   ├── utils/             # Helper functions & utilities
│   │   ├── index.ts
│   │   ├── ApiError.ts
│   │   └── asyncHandler.ts
│   ├── app.ts             # Express app configuration
│   └── server.ts          # Application entry point
├── .env                   # Environment variables (create this)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB Atlas** account (or local MongoDB)

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/savindaJ/task-manager-backend.git
cd task-manager-backend
```

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables:

```env
# =================================
# Server Configuration
# =================================
PORT=8080
NODE_ENV=development

# =================================
# Database Configuration
# =================================
# MongoDB Connection String
# Replace with your MongoDB Atlas connection string
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"
```

#### 🔑 Environment Variables Explained

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `5000` |
| `NODE_ENV` | Environment mode (`development`, `production`) | No | `development` |
| `MONGODB_URI` | MongoDB connection string | **Yes** | - |

---

### 5️⃣ Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click **"Connect"** → **"Connect your application"**
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<database>` in your `.env` file

**Example:**
```env
MONGODB_URI="mongodb+srv://myuser:mypassword123@cluster0.abc123.mongodb.net/taskmanager?retryWrites=true&w=majority"
```

> ⚠️ **Important:** Add your IP to the **Network Access** whitelist in MongoDB Atlas

---

### 6️⃣ Generate Prisma Client

```bash
npm run prisma:generate
```

---

### 7️⃣ Push Schema to Database

```bash
npm run prisma:push
```

---

### 8️⃣ Start the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

---

## 🎯 API Endpoints

Base URL: `http://localhost:8080/api`

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Check server status |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks (with pagination) |
| `GET` | `/tasks/:id` | Get task by ID |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/:id` | Update a task |
| `DELETE` | `/tasks/:id` | Delete a task |
| `GET` | `/tasks/stats` | Get task statistics |

### Query Parameters (GET /tasks)

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number | `?page=1` |
| `limit` | number | Items per page | `?limit=10` |
| `status` | string | Filter by status | `?status=TODO` |
| `priority` | string | Filter by priority | `?priority=HIGH` |
| `search` | string | Search in title/description | `?search=bug` |
| `sortBy` | string | Sort field | `?sortBy=createdAt` |
| `sortOrder` | string | Sort direction | `?sortOrder=desc` |

---

## 📝 Task Model

```typescript
{
  id: string;           // Auto-generated MongoDB ObjectId
  title: string;        // Task title (required)
  description: string;  // Task description (optional)
  status: TaskStatus;   // TODO | IN_PROGRESS | COMPLETED | CANCELLED
  priority: TaskPriority; // LOW | MEDIUM | HIGH | URGENT
  dueDate: DateTime;    // Due date (optional)
  tags: string[];       // Array of tags
  createdAt: DateTime;  // Auto-generated
  updatedAt: DateTime;  // Auto-updated
}
```

---

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:push` | Push schema to database |
| `npm run prisma:studio` | Open Prisma Studio (DB GUI) |

---

## 🧪 API Examples

### Create a Task

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write README and API docs",
    "priority": "HIGH",
    "status": "TODO",
    "tags": ["documentation", "urgent"]
  }'
```

### Get All Tasks with Pagination

```bash
curl "http://localhost:8080/api/tasks?page=1&limit=10&status=TODO"
```

### Update Task Status

```bash
curl -X PUT http://localhost:8080/api/tasks/YOUR_TASK_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "IN_PROGRESS"
  }'
```

### Delete a Task

```bash
curl -X DELETE http://localhost:8080/api/tasks/YOUR_TASK_ID
```

---

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
AuthenticationFailed: SCRAM failure
```
→ Check your `MONGODB_URI` credentials (username/password)

**2. Empty Database Name Error**
```
empty database name not allowed
```
→ Add database name to your connection string:
```
mongodb+srv://user:pass@cluster.mongodb.net/taskmanager?...
                                          ^^^^^^^^^^^
```

**3. Prisma Client Not Generated**
```
Module '"@prisma/client"' has no exported member 'PrismaClient'
```
→ Run `npm run prisma:generate`

**4. IP Not Whitelisted**
→ Go to MongoDB Atlas → Network Access → Add `0.0.0.0/0` for development

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact

**Savinda Jayasekara**

- GitHub: [@savindaJ](https://github.com/savindaJ)
- LinkedIn: [Savinda Jayasekara](https://linkedin.com/in/savindajayasekara)

---

⭐ **If you found this project helpful, please give it a star!**
