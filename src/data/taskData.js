import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #tasks = new Map()

    list() {
        return Array.from(this.#tasks.values());
    }

    select(id) {
        return this.#tasks.get(id)
    }

    create(task) {
        const taskId = randomUUID()
        task.id = taskId

        this.#tasks.set(taskId, task)
        return task
    }

    update(id, updatedFields) {
        const existingTask = this.#tasks.get(id);
        if (!existingTask) return null;

        const { id: _ignoredId, createdAt: _ignoredCreatedAt, ...allowedUpdates } = updatedFields;

        const updatedTask = {
            ...existingTask,
            ...allowedUpdates,
            updatedAt: new Date().toISOString(),
        };

        this.#tasks.set(id, updatedTask);
        return updatedTask;
    }

    delete(id) {
        const existingTask = this.#tasks.get(id);
        if (!existingTask) return null;

        this.#tasks.delete(id);
        return existingTask;
    }
}