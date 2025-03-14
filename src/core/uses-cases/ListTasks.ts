import {Task} from "../entities/task";
import {TaskRepository} from "../ports/task.repository";

export class ListTasks {
    constructor(private taskRepo: TaskRepository) {
    }

    async execute(): Promise<Task[]> {
        return await this.taskRepo.getTasks();
    }
}
