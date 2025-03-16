import {TaskRepository} from "../ports/task.repository";

export class DeleteTask {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(taskId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const task = await this.taskRepo.getTaskById(taskId);
            if (!task) {
                return {success: false, error: "Tarea no encontrada"};
            }

            await this.taskRepo.deleteTask(taskId);
            return {success: true};
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            return {success: false, error: "No se pudo eliminar la tarea. Inténtalo de nuevo."};
        }
    }
}
