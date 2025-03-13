import {TaskRepository} from "app/core/ports/taskRepository";
import {TaskStatus} from "app/core/entities/task.model";

export class ChangeTaskStatus {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(taskId: string, status: TaskStatus) {
        const task = await this.taskRepo.getTaskById(taskId);
        if (!task) throw new Error("Task not found");

        task.changeStatus(status);
        await this.taskRepo.saveTask(task);
    }
}