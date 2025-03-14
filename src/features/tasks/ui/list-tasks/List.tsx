import styles from "./_list-tasks.module.scss";
import {useTaskStore} from "app/features/tasks/state/useTaskStore";
import {useEffect, useState} from "react";

function List({title, children, handleDrop, id}) {
    const {createTask} = useTaskStore();
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [addingTaskFor, setAddingTaskFor] = useState<string | null>(null)
    const [isAddingTask, setIsAddingTask] = useState(false);

    function handleDragOver(event) {
        event.preventDefault();
    }


    function handleAddTask() {
        if (!newTaskTitle.trim()) return;
        createTask(newTaskTitle, "Sin description", id); // 🔥 Guardar la tarea en Zustand y el backend
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

export default List;
