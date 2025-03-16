import {render, screen, fireEvent} from "@testing-library/react";
import TaskListSection from "./TaskListSection";
import {useTaskStore} from "app/features/tasks/state/useTaskStore";

// Mock de Zustand para evitar llamadas reales a la API
jest.mock("../../state/useTaskStore", () => ({
    useTaskStore: jest.fn(),
}));

describe("TaskListSection component (Eliminar Tarea)", () => {
    let mockDeleteTask: jest.Mock;

    beforeEach(() => {
        mockDeleteTask = jest.fn();

        (useTaskStore as jest.Mock).mockReturnValue({
            tasks: [
                {
                    id: "task-1",
                    title: "Tarea de prueba",
                    description: "Descripción de la tarea",
                    status: "todo",
                },
            ],
            moveTask: jest.fn(),
            deleteTask: mockDeleteTask,
            isLoading: false,
        });
    });

    it("debe mostrar las tareas con el estado correspondiente", () => {
        render(
            <TaskListSection
                title="To Do"
                status={"todo"}
                setDragged={jest.fn()}
                handleDrop={jest.fn()}
            />
        );

        expect(screen.getByText("Tarea de prueba")).toBeInTheDocument();
    });

    it("debe eliminar la tarea cuando se hace clic en el icono de eliminar", () => {
        render(
            <TaskListSection
                title="To Do"
                status={"todo"}
                setDragged={jest.fn()}
                handleDrop={jest.fn()}
            />
        );

        // Encuentra la imagen de eliminar
        const deleteIcon = screen.getByAltText("delete task"); // Ajusta si la imagen tiene otro alt

        // Simula el clic en la imagen
        fireEvent.click(deleteIcon);

        // Verifica que deleteTask se haya llamado con el ID correcto
        expect(mockDeleteTask).toHaveBeenCalledWith("task-1");
    });
});
