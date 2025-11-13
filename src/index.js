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

app.listen(3000)