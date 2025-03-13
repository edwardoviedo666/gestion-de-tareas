import {TaskRepository} from "app/core/ports/task.repository";

export class DeleteTask {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(taskId: string): Promise<void> {
        const task = await this.taskRepo.getTaskById(taskId);
        if (!task) throw new Error("Task not found");

        await this.taskRepo.deleteTask(taskId);
    }
}
