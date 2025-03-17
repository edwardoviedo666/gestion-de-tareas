import { Task, TaskStatus } from "../entities/task";
import { TaskRepository } from "../ports/task.repository";

export class ChangeTaskStatus {
    constructor(private taskRepo: TaskRepository) {}

    async execute(taskId: string, status: TaskStatus): Promise<{ success: boolean; error?: string }> {
        try {
            const task = await this.taskRepo.getTaskById(taskId);
            if (!task) {
                return { success: false, error: "Tarea no encontrada" };
            }

            const updatedTask = new Task(task.id, task.title, task.description, status);
            await this.taskRepo.saveTask(updatedTask);

            return { success: true };
        } catch (error) {
            console.error("Error al cambiar el estado de la tarea:", error);
            return { success: false, error: "No se pudo actualizar la tarea. Inténtalo de nuevo." };
        }
    }
}
