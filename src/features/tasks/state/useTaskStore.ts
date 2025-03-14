import {create} from "zustand";
import {ListTasks} from "app/core/uses-cases/ListTasks";
import {AddTask} from "app/core/uses-cases/AddTask";
import {ChangeTaskStatus} from "app/core/uses-cases/ChangeTaskStatus";
import {taskRepository} from "app/infraestructure/providers/taskRepository.provider";
import {Task, TaskStatus} from "app/core/entities/task";
import {DeleteTask} from "app/core/uses-cases/DeleteTask";

const listTasks = new ListTasks(taskRepository);
const addTask = new AddTask(taskRepository);
const changeTaskStatus = new ChangeTaskStatus(taskRepository);
const deleteTaskUseCase = new DeleteTask(taskRepository); // ✅ Instanciamos el caso de uso

interface TaskState {
    tasks: Task[];
    moveTask: (taskId: string, newStatus: "todo" | "in-progress" | "done") => void;
    setTasks: (tasks: Task[]) => void;
    loadTasks: () => Promise<void>;
    createTask: (title: string, description: string, status: TaskStatus) => Promise<void>;
    updateTaskStatus: (id: string, status: "todo" | "in-progress" | "done") => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({tasks}),

    moveTask: async (taskId, newStatus) => {
        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? {...task, status: newStatus} : task
            ),
        }));

        await taskRepository.updateTask(taskId, {status: newStatus});
    },
    loadTasks: async () => {
        const tasks = await listTasks.execute();
        set({tasks});
    },

    createTask: async (title, description, status) => {
        await addTask.execute(title, description, status); // ✅ Solo pasamos dos parámetros
        const tasks = await listTasks.execute();
        set({tasks});
    },

    updateTaskStatus: async (id, status) => {
        await changeTaskStatus.execute(id, status);
        const tasks = await listTasks.execute();
        set({tasks});
    },

    deleteTask: async (id) => {
        await deleteTaskUseCase.execute(id);
        await useTaskStore.getState().loadTasks(); // ✅ Recargar estado después de eliminar
    }
}));
