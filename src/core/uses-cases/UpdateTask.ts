import {TaskRepository} from "app/core/ports/task.repository";
import {Task} from "app/core/entities/task";

export class UpdateTask {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(taskId: string, title: string, description: string) {
        const task = await this.taskRepo.getTaskById(taskId);
        if (!task) throw new Error("Task not found");
        const updatedTask = new Task(task.id, title, description, task.status);

        await this.taskRepo.saveTask(updatedTask);
    }
}
