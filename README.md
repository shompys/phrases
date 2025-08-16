# Phrases App

Aplicación fullstack para gestionar frases con paginación, búsqueda y CRUD completo.

## Stack Tecnológico

- **Backend**: NestJS + TypeScript + Mongoose
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Base de datos**: MongoDB
- **Monorepo**: Turborepo + pnpm

## Prerequisitos

- Node.js (≥18)
- pnpm
- Docker y Docker Compose

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la **raíz del proyecto** con:

```bash
# MongoDB
MONGODB_URI=mongodb://localhost:27017/phrases

# API
PORT=3000
```

### 2. Instalación

```bash
# Instalar dependencias
pnpm install
```

### 3. Base de Datos

```bash
# Levantar MongoDB con Docker
docker compose up -d

# Ver logs
docker compose logs -f

# Verificar estado
docker compose ps
```

## Desarrollo

```bash
# Levantar todo en modo desarrollo
pnpm run dev
```

Esto iniciará:

- **API**: http://localhost:3000/api/phrases
- **Frontend**: http://localhost:5173 (en http://localhost:3000 levanta una versión estática pero solo es para producción, no actualiza los cambios, no hay hot reload)

### Comandos Individuales

```bash
# Solo backend
cd apps/api && pnpm run dev

# Solo frontend
cd apps/client && pnpm run dev
```

## Seeding

Para poblar la BD con datos de prueba:

```bash
# GET request
curl http://localhost:3000/api/seed
```

O desde el frontend ya existe un boton para usar el endpoint `/api/seed`.

## API Endpoints

### Phrases

- `GET /api/phrases` - Listar con paginación y búsqueda
- `POST /api/phrases` - Crear frase
- `GET /api/phrases/:id` - Obtener por ID
- `PATCH /api/phrases/:id` - Actualizar
- `DELETE /api/phrases/:id` - Eliminar
- `POST /api/phrases/bulk` - Creación masiva
- `DELETE /api/phrases` - Borrar todas

### Parámetros de consulta

- `pageNumber=1` - Número de página (default: 1)
- `limit=14` - Elementos por página (default: 14)
- `phrase=texto` - Búsqueda case-insensitive

### Seed

- `GET /api/seed` - Poblar BD con datos de prueba

## Producción

```bash
# Build
pnpm run build

# Start (se ocupa de ejecutar el build tambien)
pnpm run start
```

## Estructura del Proyecto

```
phrases/
├── apps/
│   ├── api/          # Backend NestJS
│   └── client/       # Frontend React
├── docker-compose.yml
├── package.json
└── pnpm-workspace.yaml
```

## Features

- ✅ CRUD completo de frases
- ✅ Paginación con navegación
- ✅ Búsqueda case-insensitive
- ✅ Interfaz responsive
- ✅ Validación de datos
- ✅ Seeding de datos
- ✅ Modo oscuro (Tailwind)
- ✅ Ordenamiento por fecha de actualización
