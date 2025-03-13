import { create } from "zustand";
import {TaskLocalRepository} from "app/infraestructure/repositories/TaskLocalRepository";
import {ListTasks} from "app/core/uses-cases/ListTasks";
import {AddTask} from "app/core/uses-cases/AddTask";
import {ChangeTaskStatus} from "app/core/uses-cases/ChangeTaskStatus";
import {Task} from "app/core/entities/task.model";
const repo = new TaskLocalRepository();
const listTasks = new ListTasks(repo);
const addTask = new AddTask(repo);
const changeTaskStatus = new ChangeTaskStatus(repo);

interface TaskState {
    tasks: Task[];
    loadTasks: () => Promise<void>;
    createTask: (title: string, description: string) => Promise<void>;
    updateTaskStatus: (id: string, status: "todo" | "in-progress" | "done") => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    loadTasks: async () => {
        const tasks = await listTasks.execute();
        set({ tasks });
    },
    createTask: async (title, description) => {
        await addTask.execute(title, description);
        const tasks = await listTasks.execute();
        set({ tasks });
    },
    updateTaskStatus: async (id, status) => {
        await changeTaskStatus.execute(id, status);
        const tasks = await listTasks.execute();
        set({ tasks });
    }
}));