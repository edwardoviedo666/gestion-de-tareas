import {TaskRepository} from "app/core/ports/task.repository";
import {Task} from "app/core/entities/task";

export class ListTasks {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(): Promise<Task[]> {
        return await this.taskRepo.getTasks();
    }
}
