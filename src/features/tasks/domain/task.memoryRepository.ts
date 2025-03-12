import {TaskModel} from "app/core/model/task.model";
import {TaskRepository} from "app/core/repositories/task.repository";

export class TaskMemoryRepository extends TaskRepository {
    private tasks: TaskModel[] = [];

    async search(): Promise<TaskModel[]> {
        return this.tasks;
    }

    async save(task: TaskModel): Promise<void> {
        this.tasks.push(task);
    }

    async update(id: string, data: Partial<TaskModel>): Promise<void> {
        this.tasks = this.tasks.map(task =>
            task.id === id ? {...task, ...data} : task
        );
    }

    async delete(id: string): Promise<void> {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
