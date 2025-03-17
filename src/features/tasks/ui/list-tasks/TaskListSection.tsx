import React, {DragEvent} from "react";
import List from "app/features/tasks/ui/list-tasks/List";
import Card from "app/features/tasks/ui/card/Card";
import CardSkeleton from "app/features/tasks/ui/card/CardSkeleton";
import {Task, TaskStatus} from "app/core/entities/task";
import {useTaskStore} from "app/features/tasks/state/useTaskStore";

interface TaskListSectionProps {
    title: string;
    status: TaskStatus
    setDragged: (dragged: { data: Task; list: string } | null) => void;
    handleDrop: (event: DragEvent<HTMLDivElement>) => void;
}

export default function TaskListSection({
                                            title,
                                            status,
                                            setDragged,
                                            handleDrop,

                                        }: TaskListSectionProps) {
    const {tasks, moveTask, deleteTask, isLoading} = useTaskStore();

    return (
        <List title={title} id={status} handleDrop={handleDrop}>
            {isLoading ? (
                [...Array(3)].map((_, i) => <CardSkeleton key={i}/>)
            ) : (
                tasks
                    .filter(task => task.status === status)
                    .map(task => (
                        <Card key={task.id} task={task} setDragged={setDragged} onDelete={(id) => deleteTask(id)}
                              onChangeStatus={(id, status) => moveTask(id, status)}/>
                    ))
            )}
        </List>
    );
}
