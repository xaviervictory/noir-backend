# NOIR Backend

API REST del proyecto **NOIR**, una tienda de ropa streetwear. Este repositorio contiene el backend desarrollado con **NestJS** y **TypeScript**, que atenderá las peticiones del frontend (React + Vite).

> **Estado del proyecto:** estructura inicial. Los módulos, las rutas y la base de datos ya están creados. La lógica de negocio y la conexión de los módulos con la base de datos se irán incorporando en las próximas etapas.

## Tecnologías utilizadas

- [NestJS](https://nestjs.com/) y [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) y pgAdmin
- [@nestjs/config](https://docs.nestjs.com/techniques/configuration) para las variables de entorno
- [Postman](https://www.postman.com/) para documentar y probar los endpoints
- Git y GitHub para el control de versiones

## Estructura del proyecto


src/
├── main.ts
└── modules/
    ├── app/          # Módulo raíz (AppModule)
    ├── products/     # Productos
    ├── categories/   # Categorías
    ├── users/        # Usuarios
    ├── auth/         # Autenticación
    ├── orders/       # Pedidos
    └── contact/      # Mensajes de contacto
database/
└── noir_db.sql       # Script de la base de datos con datos de prueba


Cada módulo (excepto `app`) se generó con Nest CLI e incluye `dto/`, `entities/`, controlador, servicio y módulo. Todos están importados en `AppModule`.

## Endpoints

Cada módulo expone las rutas de un CRUD sobre su recurso:

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/recurso` | Crear |
| GET | `/recurso` | Listar todos |
| GET | `/recurso/:id` | Obtener uno por id |
| PATCH | `/recurso/:id` | Actualizar |
| DELETE | `/recurso/:id` | Eliminar |

Recursos disponibles: `products`, `categories`, `users`, `auth`, `orders` y `contact`. Por ejemplo: `http://localhost:4000/products`.

> Las rutas definitivas dependen de los controladores y de los prefijos configurados. En el módulo `auth` se agregarán más adelante rutas específicas de registro e inicio de sesión.

## Base de datos

Base relacional en PostgreSQL llamada `noir_db`. Tablas:

| Tabla | Descripción |
| --- | --- |
| `categories` | Categorías de productos |
| `users` | Usuarios y roles (`customer`, `admin`) |
| `products` | Productos, con clave foránea a `categories` |
| `orders` | Pedidos, con clave foránea a `users` |
| `order_items` | Ítems de cada pedido (relación N a M entre `orders` y `products`) |
| `contact_messages` | Mensajes del formulario de contacto |

Incluye claves primarias, claves foráneas y restricciones (`UNIQUE`, `CHECK`, `NOT NULL`), con al menos 5 registros por tabla.

Para crearla, ejecutar el script `database/noir_db.sql` dentro de una base llamada `noir_db` (por ejemplo, desde el Query Tool de pgAdmin).

## Instalación y ejecución

1. Instalar [Node.js](https://nodejs.org/) y [PostgreSQL](https://www.postgresql.org/download/).
2. Clonar el repositorio:
   bash
   git clone https://github.com/xaviervictory/noir-backend.git
   cd noir-backend
   
3. Instalar las dependencias:
   bash
   npm install
   
4. Crear el archivo `.env` a partir de `.env.example` (ver la sección siguiente).
5. Crear la base de datos `noir_db` y ejecutar `database/noir_db.sql`.
6. Iniciar el servidor en modo desarrollo:
   bash
   npm run start:dev
   

### Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run start:dev` | Inicia el servidor y recarga al guardar |
| `npm run build` | Compila el proyecto |
| `npm run start:prod` | Ejecuta la versión compilada |

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/noir_db
API_BASE_URL=http://localhost:4000/
```

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto en el que corre la API |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL |
| `API_BASE_URL` | URL base de la API |

> El archivo `.env` está incluido en `.gitignore` y **no se sube al repositorio**. El archivo `.env.example` sirve como plantilla.

## Pruebas y documentación con Postman

Los endpoints se organizan y prueban con **Postman**. La colección `NOIR-API.postman_collection.json` incluye una carpeta por módulo con las cinco operaciones.

1. Abrir Postman e importar el archivo de la colección.
2. Verificar la variable `base_url` (por defecto `http://localhost:4000`).
3. Ejecutar `npm run start:dev` y enviar las peticiones.

## Flujo de trabajo con Git

| Rama | Uso |
| --- | --- |
| `main` | Rama estable del proyecto |
| `dev` | Rama de integración del desarrollo |
| `feature/nombre-funcionalidad` | Nuevas funcionalidades |
| `fix/nombre-correccion` | Correcciones |
| `refactor/nombre-cambio` | Reorganización o mejora del código |
| `docs/nombre-documentacion` | Cambios en la documentación |

Los cambios se integran mediante Pull Requests hacia `dev`, y de `dev` hacia `main`, con commits descriptivos.

## Próximos pasos

- Conectar los módulos con la base de datos.
- Definir los DTO y las entidades de cada módulo.
- Implementar registro e inicio de sesión en `auth`.
- Conectar el frontend de NOIR con esta API.

## Autor

Proyecto desarrollado por **Xavier** como trabajo práctico de programación.