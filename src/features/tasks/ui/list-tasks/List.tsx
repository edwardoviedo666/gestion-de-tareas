import React, {DragEvent} from 'react'
import {useTaskStore} from "app/features/tasks/state/useTaskStore";
import {ReactNode, useState} from "react";
import {TaskStatus} from "app/core/entities/task";
import styles from "./list-tasks.module.scss";

interface ListProps {
    title: string;
    id: TaskStatus;
    children: ReactNode;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

export default function List({title, children, handleDrop, id}: ListProps) {
    const {createTask} = useTaskStore();
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [isAddingTask, setIsAddingTask] = useState(false);

    function handleDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }


    function handleAddTask() {
        if (!newTaskTitle.trim()) return;
        createTask(newTaskTitle, "Sin description", id);
        setNewTaskTitle("");
        setIsAddingTask(false);
    }

    return (
        <div
            data-id={id}
            className={styles.container}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className={styles.content}>
                <div>
                    <h2 className={styles.title}>{title}</h2>
                </div>

                <div className={styles['content-body']}>{children}</div>

                {isAddingTask ? (
                    <input
                        autoFocus
                        type="text"
                        className={styles['new-task-input']}
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                        onBlur={() => setIsAddingTask(false)}
                    />
                ) : (
                    <button className={styles['add-card']} onClick={() => setIsAddingTask(true)}>
                        + Añadir otra tarjeta
                    </button>
                )}
            </div>
        </div>
    );
}
