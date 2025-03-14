"use client";

import {useEffect, useState} from "react";
import {useTaskStore} from "app/features/tasks/state/useTaskStore";
import {Task} from "app/core/entities/task";
import React, {DragEvent} from 'react'
import styles from "./board.module.scss";
import TaskListSection from "app/features/tasks/ui/list-tasks/TaskListSection";

interface Props {
    initialTasks: Task[]
}

export default function BoardClient({initialTasks}: Props) {
    const {loadTasks, setTasks, moveTask} = useTaskStore();
    const [dragged, setDragged] = useState<{ data: any; list: string } | null>(null);

    useEffect(() => {
        if (initialTasks) {
            setTasks(initialTasks);
        } else {
            loadTasks();
        }
    }, [initialTasks, setTasks, loadTasks]);


    function handleDrop(event: DragEvent<HTMLDivElement>) {
        const taskId = event.dataTransfer.getData("taskId");
        const newStatus = event.currentTarget.dataset.id as "todo" | "in-progress" | "done";

        if (dragged) {
            moveTask(taskId, newStatus);
            setDragged(null);
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.main}>
                <TaskListSection
                    title="To Do"
                    status="todo"
                    setDragged={setDragged}
                    handleDrop={handleDrop}
                />

                <TaskListSection
                    title="In Progress"
                    status="in-progress"
                    setDragged={setDragged}
                    handleDrop={handleDrop}
                />

                <TaskListSection
                    title="Done"
                    status="done"
                    setDragged={setDragged}
                    handleDrop={handleDrop}
                />
            </section>
        </div>
    );
}
