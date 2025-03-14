import {Task, TaskStatus} from "../entities/task";
import {TaskRepository} from "../ports/task.repository";

export class ChangeTaskStatus {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(taskId: string, status: TaskStatus) {
        const task = await this.taskRepo.getTaskById(taskId);
        if (!task) throw new Error("Task not found");

        const updatedTask = new Task(task.id, task.title, task.description, status);

        await this.taskRepo.saveTask(updatedTask);
    }
}
