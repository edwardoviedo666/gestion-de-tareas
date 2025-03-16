import { Task } from "app/core/entities/task";
import { TaskRepository } from "app/core/ports/task.repository";

export class TaskLocalRepository implements TaskRepository {
    private tasks: Task[] = [];

    async getTasks(): Promise<Task[]> {
        return this.tasks;
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.tasks.find((task) => task.id === id) || null;
    }

    async saveTask(task: Task): Promise<void> {
        this.tasks.push(task);
    }

    async updateTask(id: string, data: Partial<Task>): Promise<void> {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, ...data } : task
        );
    }

    async deleteTask(id: string): Promise<void> {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
