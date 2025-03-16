import {create} from "zustand";
import {taskRepository} from "app/infraestructure/providers/taskRepository.provider";
import {Task, TaskStatus} from "app/core/entities/task";
import {useCaseFactory} from "app/infraestructure/factories/useCaseFactory";

const {listTasks, addTask, changeTaskStatus, deleteTask} = useCaseFactory

interface TaskState {
    isLoading: boolean;
    tasks: Task[];
    error: string | null;
    setTasks: (tasks: Task[]) => void;
    setError: (error: string | null) => void;
    loadTasks: () => Promise<void>;
    moveTask: (taskId: string, newStatus: TaskStatus) => void;
    createTask: (title: string, description: string, status: TaskStatus) => Promise<void>;
    updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    isLoading: true,
    error: null,
    setTasks: (tasks) => set({tasks, isLoading: false, error: null}),
    setError: (error) => set({error, isLoading: false}),
    loadTasks: async () => {
        set({isLoading: true, error: null});
        try {
            const tasks = await listTasks.execute();
            set({tasks, isLoading: false});
        } catch (error) {
            set({error: "No se pudieron cargar las tareas", isLoading: false});
        }
    },

    moveTask: async (taskId: string, newStatus: TaskStatus) => {
        const previousTasks = useTaskStore.getState().tasks;

        set((state) => ({
            tasks: state.tasks.map((task) =>
                task.id === taskId ? {...task, status: newStatus} : task
            ),
        }));

        try {
            await taskRepository.updateTask(taskId, {status: newStatus});
        } catch (error) {
            console.error("Error al mover la tarea:", error);
            set({tasks: previousTasks, error: "No se pudo mover la tarea. Inténtalo de nuevo."});
        }
    },

    createTask: async (title, description, status) => {
        try {
            await addTask.execute(title, description, status);
            const tasks = await listTasks.execute();
            set({tasks, error: null});
        } catch (error) {
            set({error: "Error al crear la tarea"});
        }
    },

    updateTaskStatus: async (id, status) => {
        try {
            await changeTaskStatus.execute(id, status);
            const tasks = await listTasks.execute();
            set({tasks, error: null});
        } catch (error) {
            set({error: "Error al actualizar el estado de la tarea"});
        }
    },

    deleteTask: async (id) => {
        try {
            await deleteTask.execute(id);
            await useTaskStore.getState().loadTasks();
        } catch (error) {
            set({error: "Error al eliminar la tarea"});
        }
    }
}));