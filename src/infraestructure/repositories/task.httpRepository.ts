import {TaskRepository} from "app/core/ports/task.repository";
import {Task} from "app/core/entities/task";

export class TaskHttpRepository implements TaskRepository {
    async getTasks(): Promise<Task[]> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
            cache: "no-store"
        });
        if (!response.ok) {
            throw new Error("Error al obtener tareas");
        }
        return response.json();
    }

    async getTaskById(id: string): Promise<Task | null> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
        if (!response.ok) return null;
        return response.json();
    }

    async saveTask(task: Task): Promise<void> {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
    }

    async updateTask(id: string, data: Partial<Task>): Promise<void> {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
    }

    async deleteTask(id: string): Promise<void> {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {method: "DELETE"});
    }
}
