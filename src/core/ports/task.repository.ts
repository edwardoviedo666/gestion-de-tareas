import {Task} from "../entities/task";

export interface TaskRepository {
    getTasks(): Promise<Task[]>;

    getTaskById(id: string): Promise<Task | null>;

    saveTask(task: Task): Promise<void>;

    updateTask(id: string, data: Partial<Task>): Promise<void>;

    deleteTask(id: string): Promise<void>;
}
