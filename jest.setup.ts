import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// 🔥 Mock de crypto.randomUUID() sin reasignar `global.crypto`
if (!global.crypto.randomUUID) {
    Object.defineProperty(global.crypto, "randomUUID", {
        value: () => Math.random().toString(36).substring(2, 15),
        configurable: true, // Permite redefinirlo en tests específicos
        writable: false, // Evita que sea sobrescrito accidentalmente
    });
}
