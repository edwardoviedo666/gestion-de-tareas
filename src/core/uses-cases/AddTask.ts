import {Task, TaskStatus} from "../entities/task";
import {TaskRepository} from "app/core/ports/task.repository";

export class AddTask {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(title: string, description: string, status: TaskStatus) {
        const task = new Task(crypto.randomUUID(), title, description, status);
        await this.taskRepo.saveTask(task);
    }
}
