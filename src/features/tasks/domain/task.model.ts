export class TaskModel {
    public id: string;
    public title: string;
    public completed: boolean;

    constructor(init: Partial<TaskModel> = {}) {
        this.id = init.id || crypto.randomUUID();
        this.title = init.title || "Nueva tarea";
        this.completed = init.completed || false;
    }
}
