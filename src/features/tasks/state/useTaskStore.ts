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
const deleteTaskUseCase = new DeleteTask(taskRepository);

interface TaskState {
    isLoading: boolean;
    tasks: Task[];
    error: string | null;
    setTasks: (tasks: Task[]) => void;
    setError: (error: string | null) => void;
    loadTasks: () => Promise<void>;
    createTask: (title: string, description: string, status: TaskStatus) => Promise<void>;
    updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    isLoading: true,
    error: null,
    setTasks: (tasks) => set({ tasks, isLoading: false, error: null }),
    setError: (error) => set({ error, isLoading: false }),

    loadTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const tasks = await listTasks.execute();
            set({ tasks, isLoading: false });
        } catch (error) {
            set({ error: "No se pudieron cargar las tareas", isLoading: false });
        }
    },

    createTask: async (title, description, status) => {
        try {
            await addTask.execute(title, description, status);
            const tasks = await listTasks.execute();
            set({ tasks, error: null });
        } catch (error) {
            set({ error: "Error al crear la tarea" });
        }
    },

    updateTaskStatus: async (id, status) => {
        try {
            await changeTaskStatus.execute(id, status);
            const tasks = await listTasks.execute();
            set({ tasks, error: null });
        } catch (error) {
            set({ error: "Error al actualizar el estado de la tarea" });
        }
    },

    deleteTask: async (id) => {
        try {
            await deleteTaskUseCase.execute(id);
            await useTaskStore.getState().loadTasks();
        } catch (error) {
            set({ error: "Error al eliminar la tarea" });
        }
    }
}));