"use client";
import React, { useEffect, useState } from "react";
import { TaskModel } from "../domain/task.model";
import {tasksService} from "app/features/tasks/services/task.service";

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        tasksService.getAllTasks().then(setTasks);
    }, []);

    const addTask = async () => {
        await tasksService.addTask(newTask);
        setTasks(await tasksService.getAllTasks());
        setNewTask("");
    };

    const toggleTask = async (id: string) => {
        await tasksService.toggleTask(id);
        setTasks(await tasksService.getAllTasks());
    };

    const deleteTask = async (id: string) => {
        await tasksService.deleteTask(id);
        setTasks(await tasksService.getAllTasks());
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Lista de Tareas</h1>
            <div className="flex gap-2">
                <input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nueva tarea..."
                    className="border p-2 flex-1"
                />
                <button onClick={addTask} className="bg-blue-500 text-white p-2">
                    Agregar
                </button>
            </div>
            <ul className="mt-4">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b">
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                        <span className={`flex-1 ml-2 ${task.completed ? "line-through" : ""}`}>{task.title}</span>
                        <button onClick={() => deleteTask(task.id)} className="text-red-500">X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
