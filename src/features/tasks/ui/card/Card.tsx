import Image from "next/image";
import styles from "./card.module.scss";
import {Task} from "app/core/entities/task";
import {useTaskStore} from "app/features/tasks/state/useTaskStore";

interface CardProps {
    key
    task: Task;
    setDragged: (dragged: {
        data: { id: string; title: string; status: "todo" | "in-progress" | "done" };
        list: string
    }) => void;
}

function Card({task, setDragged}: CardProps) {
    const {deleteTask} = useTaskStore();

    function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
        if (!event.dataTransfer) {
            console.error("event.dataTransfer no está disponible en dragStart");
            return;
        }

        const listId = event.currentTarget.closest('[data-id]')?.getAttribute('data-id') || "";

        setDragged({
            data: {id: task.id, title: task.title, status: task.status},
            list: listId,
        });

        event.dataTransfer.setData("taskId", task.id);
    }

    const handleDeleteTask = () => {
        deleteTask(task.id)
    }
    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className={styles['task-card']}
            data-task-id={task.id}
        >
            <div className={styles['task-header']}>
                <p>{task.title}</p>
                <span>
                     <Image src="/delete.png" width={20} height={20} alt="edit Task" onClick={handleDeleteTask}/>
                </span>
            </div>
            <div className={styles['task-footer']}>
                <span className={styles.comments}>
                    <Image src="/comments.svg" width={20} height={20} alt="comments"/>
                    {task.description.length > 0 ? task.description.length : null}
                </span>
                <span>
                    <Image src="/avatar.png" width={20} height={20} alt="Avatar"/>
                </span>
            </div>
        </div>
    );
}

export default Card;
