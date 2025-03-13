"use client";
import React, {useEffect, useState} from "react";
import {useTaskStore} from "../state/useTaskStore";
import {TaskStatus} from "app/core/entities/task"; // ✅ Conectamos Zustand

export default function TaskList() {
    const {tasks, loadTasks, createTask, updateTaskStatus, deleteTask} = useTaskStore();
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    // Cargar tareas al montar el componente
    useEffect(() => {
        loadTasks();
    }, []);

    // Agregar tarea
    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        await createTask(newTaskTitle, newTaskDescription || "Sin descripción");

        setNewTaskTitle("");
        setNewTaskDescription(""); // ✅ Limpiamos después de agregar
    };

    // Alternar estado de tarea (completada o no)
    const toggleTask = async (id: string, completed: boolean) => {
        const newStatus = (completed ? "done" : "todo") as TaskStatus; // ✅ Solución con as TaskStatus
        await updateTaskStatus(id, newStatus);
    };


    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Lista de Tareas</h1>

            <div className="flex gap-2">
                <input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Título de la tarea"
                    className="border p-2 flex-1"
                />

                <input
                    value={newTaskDescription} // ✅ Agregado
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Descripción de la tarea"
                    className="border p-2 flex-1"
                />

                <button onClick={handleAddTask} className="bg-blue-500 text-white p-2">
                    Agregar
                </button>
            </div>

            <ul className="mt-4">
                {tasks.map(task => (
                    <li key={task.id} className="flex justify-between items-center p-2 border-b">
                        <input
                            type="checkbox"
                            checked={task.status === "done"}
                            onChange={() => toggleTask(task.id, task.status !== "done")}
                        />
                        <span className={`flex-1 ml-2 ${task.status === "done" ? "line-through" : ""}`}>
              {task.title}
            </span>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-500"
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
