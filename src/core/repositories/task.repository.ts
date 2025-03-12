import {TaskModel} from "app/core/model/task.model";

export abstract class TaskRepository {
    abstract search(): Promise<TaskModel[]>;

    abstract save(task: TaskModel): Promise<void>;

    abstract update(id: string, data: Partial<TaskModel>): Promise<void>;

    abstract delete(id: string): Promise<void>;
}
