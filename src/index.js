import express from "express";
import { DatabaseMemory } from "./data/taskData.js";

const app = express()
const database = new DatabaseMemory()

app.use(express.json())

// health check
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Todo API está rodando!",
        version: "1.0.0"
    });
})

// task list
app.get('/api/tasks', (req, res) => {
    const tasks = database.list();

    return res.status(200).json({
        success: true,
        data: tasks,
    });
})

// task list by ID
app.get("/api/tasks/:id", (req, res) => {
    const { id } = req.params;

    const task = database.select(id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Tarefa não encontrada",
        });
    }

    return res.status(200).json({
        success: true,
        data: task,
    });
});

// create task
app.post("/api/tasks", (req, res) => {
    const { title, description, completed = false } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "O título é obrigatório",
        });
    }

    const newTask = database.create({
        title: title.trim(),
        description: description,
        completed,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    return res.status(201).json({
        success: true,
        data: newTask,
        message: "Tarefa criada com sucesso",
    });
});

// Update task
app.put("/api/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const existingTask = database.select(id);
    if (!existingTask) {
        return res.status(404).json({
            success: false,
            message: "Tarefa não encontrada",
        });
    }

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (description !== undefined) updatedFields.description = description;
    if (completed !== undefined) updatedFields.completed = completed;

    const updatedTask = database.update(id, updatedFields);

    return res.status(200).json({
        success: true,
        data: updatedTask,
        message: "Tarefa atualizada com sucesso",
    });
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const deletedTask = database.delete(id);

  if (!deletedTask) {
    return res.status(404).json({
      success: false,
      message: "Tarefa não encontrada",
    });
  }

  return res.status(200).json({
    success: true,
    data: deletedTask,
    message: "Tarefa deletada com sucesso",
  });
});

app.listen(3000)