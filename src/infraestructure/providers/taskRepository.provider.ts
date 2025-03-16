import {providerFactory} from "./providerFactory";
import {TaskRepository} from "app/core/ports/task.repository";
import {EnvironmentEnum} from "app/infraestructure/providers/environment.enum";
import {TaskHttpRepository, TaskLocalRepository} from "app/infraestructure/repositories";

export const taskRepository: TaskRepository = providerFactory(
    {
        [EnvironmentEnum.Local]: new TaskLocalRepository(),
        [EnvironmentEnum.Development]: new TaskHttpRepository(),
        [EnvironmentEnum.Production]: new TaskHttpRepository(),
    },
    new TaskLocalRepository()
);
