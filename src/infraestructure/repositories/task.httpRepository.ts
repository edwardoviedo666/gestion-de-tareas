import {TaskRepository} from "app/core/ports/task.repository";
import {Task} from "app/core/entities/task";
import {httpRequest} from "app/core/utils/handleApiRequest";


export class TaskHttpRepository implements TaskRepository {
    private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

    async getTasks(): Promise<Task[]> {
        return httpRequest<Task[]>(`${this.baseUrl}/tasks`, {cache: "no-store"});
    }

    async getTaskById(id: string): Promise<Task | null> {
        return httpRequest<Task | null>(`${this.baseUrl}/tasks/${id}`);
    }

    async saveTask(task: Task): Promise<void> {
        await httpRequest<void>(`${this.baseUrl}/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
    }

    async updateTask(id: string, data: Partial<Task>): Promise<void> {
        await httpRequest<void>(`${this.baseUrl}/tasks/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
    }

    async deleteTask(id: string): Promise<void> {
        await httpRequest<void>(`${this.baseUrl}/tasks/${id}`, {method: "DELETE"});
    }
}
