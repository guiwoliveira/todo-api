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

    update(id, task) {
        this.#tasks.set(id, task)
    }

    delete(id) {
        this.#tasks.delete(id)
    }
}