import {TaskRepository} from "app/core/ports/taskRepository";
import {Task} from "app/core/entities/task.model";


export class AddTask {
    constructor(private taskRepo: TaskRepository) {}

    async execute(title: string, description: string) {
        const task = new Task(crypto.randomUUID(), title, description);
        await this.taskRepo.saveTask(task);
    }
}
