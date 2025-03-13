import {TaskStatus, Task} from "app/core/entities/task";
import {TaskRepository} from "app/core/ports/task.repository";

export class ChangeTaskStatus {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(taskId: string, status: TaskStatus) {
        debugger
        const task = await this.taskRepo.getTaskById(taskId);
        if (!task) throw new Error("Task not found");

        const updatedTask = new Task(task.id, task.title, task.description, status);

        await this.taskRepo.saveTask(updatedTask);
    }
}
