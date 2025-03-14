"use client";

import styles from "./_board.module.scss";
import List from "app/features/tasks/ui/list-tasks/List";
import Card from "app/features/tasks/ui/card/Card";
import {useTaskStore} from "app/features/tasks/state/useTaskStore";
import {useEffect, useState} from "react";

function Board() {
    const {tasks, loadTasks, moveTask, deleteTask} = useTaskStore();
    const [dragged, setDragged] = useState<{ data: any; list: string } | null>(null);

    useEffect(() => {
        loadTasks()
    }, []);

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
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
                <List title="To Do" id="todo" handleDrop={handleDrop}>
                    {tasks.filter(task => task.status === "todo").map(task => (
                        <Card key={task.id} task={task} setDragged={setDragged} onDelete={(id) => deleteTask(id)}/>
                    ))}
                </List>

                <List title="In Progress" id="in-progress" handleDrop={handleDrop}>
                    {tasks.filter(task => task.status === "in-progress").map(task => (
                        <Card key={task.id} task={task} setDragged={setDragged}  onDelete={(id) => deleteTask(id)}/>
                    ))}
                </List>

                <List title="Done" id="done" handleDrop={handleDrop}>
                    {tasks.filter(task => task.status === "done").map(task => (
                        <Card key={task.id} task={task} setDragged={setDragged}  onDelete={(id) => deleteTask(id)}/>
                    ))}
                </List>
            </section>
        </div>
    );
}

export default Board;
