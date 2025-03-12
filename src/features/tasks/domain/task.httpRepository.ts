import {TaskRepository} from "app/core/repositories/task.repository";
import {TaskModel} from "app/core/model/task.model";

export class TaskHttpRepository extends TaskRepository {
    async search(): Promise<TaskModel[]> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
        return response.json();
    }

    async save(task: TaskModel): Promise<void> {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
    }

    async update(id: string, data: Partial<TaskModel>): Promise<void> {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
    }

    async delete(id: string): Promise<void> {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {method: "DELETE"});
    }
}
