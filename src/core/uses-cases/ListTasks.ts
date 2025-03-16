import { Task } from "../entities/task";
import { TaskRepository } from "../ports/task.repository";

export class ListTasks {
    constructor(private taskRepo: TaskRepository) {}

    async execute(): Promise<Task[]> {
        try {
            return await this.taskRepo.getTasks();
        } catch (error) {
            console.error("Error al cargar tareas:", error);
            return [];
        }
    }
}
