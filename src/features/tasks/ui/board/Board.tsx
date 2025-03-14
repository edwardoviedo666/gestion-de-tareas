import {TaskLocalRepository} from "app/infraestructure/repositories/task.localRepository";
import {TaskHttpRepository} from "app/infraestructure/repositories/task.httpRepository";
import {ListTasks} from "app/core/uses-cases/ListTasks";
import BoardClient from "./BoardClient";

export default async function Board() {
    const env = process.env.NEXT_PUBLIC_ENV || "local";
    const repo = env === "local" ? new TaskLocalRepository() : new TaskHttpRepository();
    const listTasks = new ListTasks(repo);
    const tasks = await listTasks.execute();
    return <BoardClient initialTasks={tasks}/>;
}
