import { Task, TaskStatus } from "../entities/task";
import { TaskRepository } from "../ports/task.repository";

export class AddTask {
    constructor(private taskRepo: TaskRepository) {}

    async execute(title: string, description: string, status: TaskStatus): Promise<{ success: boolean; error?: string }> {
        try {
            const task = new Task(crypto.randomUUID(), title, description, status);
            await this.taskRepo.saveTask(task);
            return { success: true };
        } catch (error) {
            console.error("Error al agregar la tarea:", error);
            return { success: false, error: "No se pudo agregar la tarea. Inténtalo de nuevo." };
        }
    }
}
