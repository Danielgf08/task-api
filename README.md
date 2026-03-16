# Task API

REST API para gestión de tareas con autenticación JWT, construida con Node.js y PostgreSQL.

## Características

- Registro e inicio de sesión de usuarios con JWT
- Contraseñas encriptadas con bcrypt
- CRUD completo de tareas por usuario autenticado
- Validación de datos con Zod
- Queries parametrizados seguros contra SQL injection

## Tecnologías

- Node.js + Express
- PostgreSQL
- JSON Web Tokens (JWT)
- bcryptjs
- Zod

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo

## Instalación

1. Clona el repositorio

\`\`\`bash
git clone https://github.com/Danielgf08/task-api
cd task-api
\`\`\`

2. Instala las dependencias

\`\`\`bash
npm install
\`\`\`

3. Crea el archivo `.env` en la raíz con estas variables

\`\`\`
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña
DB_NAME=taskdb
JWT_SECRET=una_clave_secreta_larga
\`\`\`

4. Crea la base de datos y las tablas en PostgreSQL

\`\`\`sql
CREATE DATABASE taskdb;

\c taskdb

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

5. Inicia el servidor

\`\`\`bash
npm run dev
\`\`\`

El servidor corre en `http://localhost:3000`

## Endpoints

### Auth

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /auth/register | Registrar nuevo usuario |
| POST | /auth/login | Iniciar sesión, retorna JWT |

### Tasks (requieren token JWT)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /tasks | Obtener todas mis tareas |
| POST | /tasks | Crear nueva tarea |
| PUT | /tasks/:id | Actualizar tarea |
| DELETE | /tasks/:id | Eliminar tarea |

## Uso

Todas las rutas de `/tasks` requieren el header de autorización:

\`\`\`
Authorization: Bearer tu_token_jwt
\`\`\`

### Ejemplo — Registro

\`\`\`bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@gmail.com","password":"123456"}'
\`\`\`

### Ejemplo — Crear tarea

\`\`\`bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token" \
  -d '{"title":"Mi tarea","description":"Descripción opcional"}'
\`\`\`

## Estructura del proyecto

\`\`\`
src/
  config/
    db.js           # Conexión a PostgreSQL
  controllers/
    auth.controller.js
    task.controller.js
  middlewares/
    auth.middleware.js    # Verificación JWT
    validate.middleware.js # Validación con Zod
  routes/
    auth.routes.js
    task.routes.js
  schemas/
    auth.schema.js
    task.schema.js
  app.js
index.js
\`\`\`