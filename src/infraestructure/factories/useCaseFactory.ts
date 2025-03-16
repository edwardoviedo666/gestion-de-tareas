import {taskRepository} from "app/infraestructure/providers/taskRepository.provider";
import {AddTask, ChangeTaskStatus, DeleteTask, ListTasks} from "app/core/uses-cases";

class UseCaseFactory {

    private static instance: UseCaseFactory;

    public listTasks: ListTasks;
    public addTask: AddTask;
    public changeTaskStatus: ChangeTaskStatus;
    public deleteTask: DeleteTask;

    private constructor() {
        const repository = taskRepository;
        this.listTasks = new ListTasks(repository);
        this.addTask = new AddTask(repository);
        this.changeTaskStatus = new ChangeTaskStatus(repository);
        this.deleteTask = new DeleteTask(repository);
    }

    public static getInstance(): UseCaseFactory {
        if (!UseCaseFactory.instance) {
            UseCaseFactory.instance = new UseCaseFactory();
        }
        return UseCaseFactory.instance;
    }
}

export const useCaseFactory = UseCaseFactory.getInstance();
