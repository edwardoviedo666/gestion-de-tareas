import {render, screen, fireEvent} from "@testing-library/react";
import List from "./List";
import {useTaskStore} from "../../state/useTaskStore"

// Mock de Zustand para evitar llamadas a la API reales
jest.mock("../../state/useTaskStore", () => ({
    useTaskStore: jest.fn(),
}));

describe("List component (Crear Tarea)", () => {
    let mockCreateTask: jest.Mock;

    beforeEach(() => {
        mockCreateTask = jest.fn();
        (useTaskStore as jest.Mock).mockReturnValue({createTask: mockCreateTask});
    });

    it("debe mostrar el título y el botón para agregar una tarea", () => {
        render(
            <List title="To Do" id="todo" handleDrop={jest.fn()}>
                <p>Ejemplo de tarea</p>
            </List>
        );

        expect(screen.getByText("To Do")).toBeInTheDocument();
        expect(screen.getByText("+ Añadir otra tarjeta")).toBeInTheDocument();
        expect(screen.getByText("Ejemplo de tarea")).toBeInTheDocument();
    });

    it("debe mostrar el input cuando se hace clic en 'Añadir otra tarjeta'", () => {
        render(
            <List title="To Do" id="todo" handleDrop={jest.fn()}>
                <p>Ejemplo de tarea</p>
            </List>
        );

        const addButton = screen.getByText("+ Añadir otra tarjeta");
        fireEvent.click(addButton);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("debe agregar una tarea cuando se ingresa un título y se presiona Enter", () => {
        render(
            <List title="To Do" id="todo" handleDrop={jest.fn()}>
                <p>Ejemplo de tarea</p>
            </List>
        );

        fireEvent.click(screen.getByText("+ Añadir otra tarjeta"));

        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: "Nueva Tarea"}});
        fireEvent.keyDown(input, {key: "Enter", code: "Enter"});

        expect(mockCreateTask).toHaveBeenCalledWith("Nueva Tarea", "Sin description", "todo");
    });

    it("debe ocultar el input si se hace blur sin ingresar un título", () => {
        render(
            <List title="To Do" id="todo" handleDrop={jest.fn()}>
                <p>Ejemplo de tarea</p>
            </List>
        );

        fireEvent.click(screen.getByText("+ Añadir otra tarjeta"));

        const input = screen.getByRole("textbox");
        fireEvent.blur(input);

        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

});
