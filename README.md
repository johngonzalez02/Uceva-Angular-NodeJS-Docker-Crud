# Laboratorio II - Programación en Ambiente Web I

Backend en Node.js con TypeScript, Express y PostgreSQL (Docker). Tiene cuatro módulos con CRUD completo:

| Módulo       | Ruta               | Origen           |
|--------------|--------------------|------------------|
| Estudiantes  | `/api/students`    | Repo del docente |
| Cursos       | `/api/courses`     | Repo del docente |
| Profesores   | `/api/teachers`    | Laboratorio II   |
| Salones      | `/api/classrooms`  | Laboratorio II   |

## Estructura de cada módulo

```
src/
  database/            init.sql, seed.sql, consult.sql
  domain/
    dtos/              create-*.dto.ts, update-*.dto.ts
    interfaces/        *.interface.ts
  presentation/
    routes.ts
    modules/<modulo>/  *.service.ts, *.controller.ts, *.routes.ts
```

## Ejecución

```bash
cd Backend
docker compose up -d
npm install
npm run db:init
npm run db:seed
npm start
```

- API: http://localhost:3000/api
- Swagger: http://localhost:3000/api/docs
- pgAdmin: http://localhost:8080 (user@google.com / 123456)

`db:init` crea las tablas y `db:seed` inserta los datos iniciales. Si se necesita repetir el seed, hay que apagar los contenedores (`docker compose down`), borrar la carpeta `postgres/` y volver a correr los pasos.

## Endpoints

Los dos módulos nuevos tienen las mismas cinco operaciones:

| Método | Ruta                  | Descripción      |
|--------|-----------------------|------------------|
| GET    | `/api/<modulo>`       | Consultar todos  |
| GET    | `/api/<modulo>/:id`   | Consultar por id |
| POST   | `/api/<modulo>`       | Crear            |
| PUT    | `/api/<modulo>/:id`   | Actualizar       |
| DELETE | `/api/<modulo>/:id`   | Eliminar         |

### Profesores (`/api/teachers`)

```json
{
  "name": "Ricardo Mendoza",
  "email": "ricardo.mendoza@uceva.edu.co",
  "phone": "3141112233",
  "department": "Ingenieria de Sistemas",
  "specialty": "Desarrollo Web",
  "hiredate": "2015-02-10",
  "status": true
}
```

### Salones (`/api/classrooms`)

```json
{
  "name": "Aula 101",
  "building": "Bloque A",
  "capacity": 35,
  "type": "Aula",
  "status": true
}
```

`type` acepta: `Aula`, `Laboratorio`, `Auditorio`, `Sala de Computo`. El campo `status` es opcional y por defecto es `true`.

## Códigos de respuesta

- `200` consulta, actualización o eliminación exitosa
- `201` registro creado
- `400` datos inválidos o id no numérico
- `404` registro no encontrado
- `409` correo, teléfono o nombre ya registrado
