import {TaskMemoryRepository} from "./task.memoryRepository";
import {TaskHttpRepository} from "./task.httpRepository";
import {EnvironmentEnum} from "app/core/enums/environment.enum";
import {TaskRepository} from "app/core/repositories/task.repository";
import {providerFactory} from "app/core/providerFactory";

export const taskRepository: TaskRepository = providerFactory({
    [EnvironmentEnum.Local]: new TaskMemoryRepository(),
    [EnvironmentEnum.Development]: new TaskHttpRepository(),
    [EnvironmentEnum.Production]: new TaskHttpRepository(),
});
