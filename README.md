# ArticlesDash

## Descripción

Esta aplicación web permite gestionar artículos de forma sencilla, con funcionalidades de búsqueda, filtrado, ordenamiento y exportación de datos.  
Incluye un sistema de autenticación básico y una interfaz amigable construida con React y Material UI.

---

## Características principales

- **Listado de artículos** con filtros por estado, búsqueda y ordenamiento por fecha y monto.
- **Exportación a CSV** de los artículos filtrados.
- **Autenticación** con rutas públicas y privadas mediante React Router.
- **Frontend moderno** usando React + TypeScript + Zustand + Material UI.
- **Backend rápido** usando Node.js + TypeScript + Express.

---

## 📌 Tecnologías Utilizadas

### 🔹 Backend

- **Node.js + Express 5** → Framework para la API REST.
- **TypeScript** → Tipado estático para mayor mantenibilidad.
- **Helmet** → Seguridad con cabeceras HTTP.
- **CORS** → Control de acceso entre frontend y backend.
- **Morgan** → Logging de peticiones HTTP.
- **fs-extra** → Manejo de archivos.
- **Day.js** → Manejo de fechas ligero.
- **dotenv** → Manejo de variables de entorno.
- **Jest + Supertest** → Testing de unidad e integración.
- **ts-node-dev** → Hot reload en desarrollo.
- **Prettier** → Formato consistente del código.

### 🔹 Frontend

- **React 19 + TypeScript** → Librería principal de UI.
- **Vite** → Bundler rápido y moderno.
- **Material UI (MUI)** → Componentes de interfaz modernos y accesibles.
- **TailwindCSS** → Estilos utilitarios.
- **Zustand** → Manejo de estado global.
- **React Router v7** → Ruteo de la aplicación.
- **Formik + Yup** → Formularios y validaciones.
- **Axios** → Cliente HTTP.
- **React Toastify** → Notificaciones.
- **React Window** → Optimización de tablas/listas grandes.
- **React Testing Library + Vitest** → Pruebas unitarias y de integración.
- **Cypress** → Pruebas E2E para flujos completos.

---

## ⚙️ Configuración del Proyecto

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/wladimeer/articles-dash.git
cd articles-dash
```

---

### 2️⃣ Configuración del Backend

```bash
cd backend
```

1. **Instalar dependencias**:

```bash
npm install
```

2. **Configurar variables de entorno**  
   Crear un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
PORT=3000
SECRET_KEY=mysecretkey1234567890
```

3. **Levantar en desarrollo**:

```bash
npm run dev
```

4. **Build para producción**:

```bash
npm run tsc
npm start
```

5. **Ejecutar pruebas en backend**:

```bash
npm test
```

---

### 3️⃣ Configuración del Frontend

```bash
cd frontend
```

1. **Instalar dependencias**:

```bash
npm install
```

2. **Levantar en desarrollo**:

```bash
npm run dev
```

La app quedará disponible normalmente en 👉 `http://localhost:5173`

3. **Build para producción**:

```bash
npm run build
npm run preview
```

4. **Ejecutar pruebas en frontend**:

- **Unitarias/Integración (Vitest + RTL)**:

```bash
npm test
```

- **End-to-End (Cypress)**:

```bash
npm run cypress:open
# o para correr en CLI
npm run cypress:run
```

---

## 🧪 Pruebas

### Backend

- Se utilizan **Jest + Supertest** para testear controladores, rutas y middlewares.
- Ejecutar con:

```bash
cd backend
npm test
```

### Frontend

- Se utilizan **Vitest + React Testing Library** para testear componentes y hooks.
- Se utilizan **Cypress** para pruebas E2E que incluyen:

  - Inicio de sesión.
  - Renderizado de tabla de artículos.
  - Filtrado por búsqueda y estado.
  - Ordenamiento por fecha y monto.

- Ejecutar pruebas unitarias/integración con:

```bash
cd frontend
npm test
```

- Ejecutar pruebas E2E con:

```bash
npm run cypress:open
```

---

## 📦 Estructura del Proyecto

```
/backend
  ├── src/
  │   ├── index.ts
  │   ├── constants/
  │   ├── data/
  │   ├── interfaces/
  │   ├── routes/
  │   ├── services/
  │   ├── utils/
  │   └── tests/
  ├── package.json
  ├── tsconfig.json
  ├── jest.config.js
  └── .env

/frontend
  ├── src/
  │   ├── App.tsx
  │   ├── main.tsx
  │   ├── api/
  │   ├── components/
  │   ├── constants/
  │   ├── hooks/
  │   ├── interfaces/
  │   ├── pages/
  │   ├── routes/
  │   ├── store/
  │   ├── tests/
  │   ├── types/
  │   └── utils/
  ├── package.json
  ├── tsconfig.json
  └── vite.config.ts
```

---

## ✅ Resumen de Comandos

### 🔹 Backend

| Acción         | Comando       |
| -------------- | ------------- |
| Instalar deps  | `npm install` |
| Correr en dev  | `npm run dev` |
| Compilar TS    | `npm run tsc` |
| Correr en prod | `npm start`   |
| Ejecutar tests | `npm test`    |

### 🔹 Frontend

| Acción           | Comando                |
| ---------------- | ---------------------- |
| Instalar deps    | `npm install`          |
| Correr en dev    | `npm run dev`          |
| Build producción | `npm run build`        |
| Preview build    | `npm run preview`      |
| Ejecutar tests   | `npm test`             |
| E2E (Cypress)    | `npm run cypress:open` |

---

## 📌 Notas Finales

- Asegúrate de tener **Node.js >= 18** instalado.
- El **backend** se levanta en `http://localhost:3000`.
- El **frontend** se levanta en `http://localhost:5173` y se conecta al backend configurado.
- Las pruebas E2E se ejecutan sobre el frontend levantado y requieren que la API del backend esté activa.


