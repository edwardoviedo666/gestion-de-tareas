import Image from "next/image";
import styles from "./card.module.scss";
import {Task, TaskStatus} from "app/core/entities/task";
import {useResponsive} from "app/infraestructure/hooks/useResponsive";

interface CardProps {
    key: string
    task: Task;
    onDelete: (id: string) => void;
    setDragged: (dragged: { data: Task; list: string } | null) => void;
    onChangeStatus: (id: string, newStatus: TaskStatus) => void;
}

function Card({task, setDragged, onDelete, onChangeStatus}: CardProps) {
    const showSelect: boolean = useResponsive()

    function handleDragStart(event: React.DragEvent<HTMLDivElement>) {
        if (!event.dataTransfer) {
            console.error("event.dataTransfer no está disponible en dragStart");
            return;
        }

        const listId = event.currentTarget.closest('[data-id]')?.getAttribute('data-id') || "";

        setDragged({
            data: {...task},
            list: listId,
        });

        event.dataTransfer.setData("taskId", task.id);
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = event.target.value as "todo" | "in-progress" | "done";
        onChangeStatus(task.id, newStatus);
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
                     <Image src="/delete.png" width={20} height={20} alt="delete task"
                            onClick={_ => onDelete(task.id)}/>
                </span>
            </div>

            <div className={styles['task-footer']}>
                <span className={styles.comments}>
                    <Image src="/comments.svg" width={20} height={20} alt="comments"/>
                    {task.description.length > 0 ? task.description.length : null}
                    {showSelect &&
                        <select className={styles['status-select']} value={task.status} onChange={handleStatusChange}>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>}
                </span>
                <span>
                    <Image src="/avatar.png" width={20} height={20} alt="Avatar"/>
                </span>
            </div>
        </div>
    );
}

export default Card;
