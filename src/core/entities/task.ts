export type TaskStatus = "todo" | "in-progress" | "done";

export class Task {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly status: TaskStatus = "todo"
    ) {}
}
