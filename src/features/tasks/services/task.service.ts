
import {taskRepository} from "app/features/tasks/domain/task.provider";
import {TaskModel} from "app/core/model/task.model";

class TasksService {
    async getAllTasks(): Promise<TaskModel[]> {
        return await taskRepository.search();
    }

    async addTask(title: string): Promise<void> {
        const newTask = new TaskModel({title});
        await taskRepository.save(newTask);
    }

    async toggleTask(id: string): Promise<void> {
        const tasks = await taskRepository.search();
        const task = tasks.find(t => t.id === id);
        if (task) {
            await taskRepository.update(id, {completed: !task.completed});
        }
    }

    async deleteTask(id: string): Promise<void> {
        await taskRepository.delete(id);
    }
}

export const tasksService = new TasksService();
