# 📝 Task Manager - Gestión de Tareas

Este proyecto es una aplicación de gestión de tareas desarrollada con **Next.js** y organizada bajo un enfoque **modular y escalable**. Implementa patrones de diseño como **Clean Architecture** y utiliza tecnologías modernas como **Zustand** para la gestión del estado.

## 📁 **Estructura del Proyecto**
```
src/
│── app/                     # Punto de entrada principal
│   ├── protected/           # Rutas protegidas
│   │   ├── board/           # Vista principal del tablero de tareas
│   │   │   ├── page.tsx     # Interfaz general de la vista 'Board'
│   │   ├── layout.tsx       # Layout de la aplicación
│
│── core/                    # Lógica de dominio
│   ├── entities/            # Entidades del negocio (Task, TaskStatus)
│   ├── ports/               # Definición de interfaces para abstracción de infraestructura
│   ├── uses-cases/          # Casos de uso (AddTask, DeleteTask, ChangeTaskStatus, etc.)
│   ├── utils/               # Funciones utilitarias como httpRequest para gestión de peticiones
│
│── features/                # Funcionalidades modulares de la aplicación
│
│── infraestructure/         # Implementaciones de infraestructura (API, persistencia)
│
│── shared/                  # Componentes compartidos y estilos globales
```

---

## 🚀 **Cómo Ejecutar el Proyecto**
### 1️⃣ **Instalar dependencias**
Antes de iniciar la aplicación, asegúrate de instalar todas las dependencias necesarias:

```sh
npm install
```

### 2️⃣ **Iniciar el Servidor**
Ejecuta el siguiente comando para iniciar tanto la API fake (`json-server`) como la aplicación Next.js en modo desarrollo:

```sh
npm run dev
```
> 🔹 Esto iniciará el servidor JSON en el puerto `5000` y Next.js con **Turbopack** para un desarrollo más rápido.

### 3️⃣ **Ejecutar Pruebas**
Para ejecutar las pruebas unitarias, usa:

```sh
npm run test
```

Si estás en un entorno de CI/CD, usa:

```sh
npm run test:ci
```

---

## 🏗️ **Decisiones de Diseño**
### ✅ **Uso de Clean Architecture**
El proyecto sigue una **arquitectura limpia** para mantener la separación entre capas:
- `core/` contiene la **lógica de negocio** y no depende de infraestructura.
- `infraestructure/` maneja la **persistencia y comunicación con API**.
- `app/` contiene la **interfaz de usuario y lógica de presentación**.

### ✅ **Zustand para el Estado Global**
En lugar de `Redux`, se usa **Zustand**, lo que permite un estado global más sencillo y eficiente.

### ✅ **Interceptor de Errores en HTTP**
Se implementó una función `httpRequest` para manejar errores de red y servidor de manera centralizada. Esto previene fallos inesperados en la UI.

### ✅ **Pruebas Unitarias**
Cada módulo incluye archivos de prueba colocados junto a su implementación para facilitar el testing.

---

## 📌 **Casos de Uso Implementados**
| Caso de Uso        | Descripción |
|--------------------|------------|
| `AddTask`         | Agrega una nueva tarea. |
| `ChangeTaskStatus`| Cambia el estado de una tarea. |
| `DeleteTask`      | Elimina una tarea existente. |
| `ListTasks`       | Obtiene la lista de tareas. |

---

## ⚡ **Problemas Abordados**
✅ **Evitar errores inesperados en el frontend.**  
✅ **Gestión centralizada de errores con un interceptor de peticiones HTTP.**  
✅ **Uso de Tipado Estricto con TypeScript para mayor seguridad.**  
✅ **Estructura modular y escalable para futuros cambios.**  
✅ **Manejo de entornos y configuración dinámica de repositorios.**

El proyecto utiliza un **sistema de proveedores** para determinar el repositorio a utilizar en función del entorno en el que se ejecuta la aplicación (`Local`, `Development` o `Production`).

- **Archivo `.env`**
    - `NEXT_PUBLIC_ENV`: Define el entorno (`local`, `development`, `production`).
    - `NEXT_PUBLIC_API_URL`: URL de la API, configurada por defecto para JSON Server (`http://localhost:5000`).
    - Es importante **no eliminar este archivo** para que el proyecto funcione correctamente.

- **Gestión de repositorios**
    - Se usa `providerFactory` para decidir si se utiliza `TaskLocalRepository` (datos en memoria) o `TaskHttpRepository` (datos obtenidos desde la API).
    - Si el entorno es `local`, se usa `TaskLocalRepository`, permitiendo pruebas sin conexión.
    - Para `development` y `production`, se usa `TaskHttpRepository`, que interactúa con la API real.

- **Base de datos local (`db.json`)**
    - Al agregar o eliminar una tarea, los cambios pueden verse reflejados en `db.json`.
    - Este archivo es esencial para el correcto funcionamiento con `json-server` y **no debe ser eliminado**.

---

## 🛠 **Tecnologías Utilizadas**
- **Next.js** - Framework de React para SSR y SSG.
- **Zustand** - Gestión de estado eficiente y minimalista.
- **TypeScript** - Tipado estático para mayor seguridad.
- **JSON Server** - API fake para desarrollo rápido.
- **Jest** - Framework de testing.

---

## 👨‍💻 **Contribución**
Si deseas contribuir:
1. Haz un **fork** del repositorio.
2. Crea una nueva rama (`feature/nueva-funcionalidad`).
3. Haz un **commit** de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4. Envía un **pull request**.

---

## 📄 **Licencia**
Este proyecto está bajo la licencia MIT. Puedes usarlo libremente para tus propios proyectos.

---

### 🚀 **¡Listo para usar y escalar!**
Si tienes alguna duda o sugerencia, no dudes en abrir un **issue** o contribuir al proyecto. 🔥

