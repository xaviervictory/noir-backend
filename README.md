# NOIR Backend

API REST del proyecto **NOIR**, una tienda de ropa streetwear. Este repositorio contiene el backend desarrollado con **NestJS**, **TypeScript**, **Prisma** y **PostgreSQL**, que atiende las peticiones del frontend (React + Vite).

## Funcionalidades

- CRUD de **productos**, **categorías**, **pedidos** y **mensajes de contacto**.
- **Registro e inicio de sesión** de usuarios, con contraseñas hasheadas (bcrypt) y token **JWT**.
- **Validación de datos** de entrada con DTOs y `class-validator`.
- Conexión a **PostgreSQL** mediante **Prisma** (modelos, relaciones y migraciones).
- Reglas de integridad en los services: categorías y productos que deben existir, totales de pedidos que deben coincidir con sus ítems, y errores claros (404, 409, 400) cuando algo no corresponde.
- Colección de **Postman** para probar todos los endpoints.

## Tecnologías utilizadas

- [NestJS](https://nestjs.com/) y [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) y pgAdmin
- [Prisma 7](https://www.prisma.io/) con `@prisma/client` y `@prisma/adapter-pg`
- [class-validator](https://github.com/typestack/class-validator) y [class-transformer](https://github.com/typestack/class-transformer)
- [@nestjs/jwt](https://github.com/nestjs/jwt) y [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [@nestjs/config](https://docs.nestjs.com/techniques/configuration) y dotenv para las variables de entorno
- [Postman](https://www.postman.com/) para documentar y probar los endpoints
- Git y GitHub para el control de versiones

## Estructura del proyecto


prisma/
├── schema.prisma          # Modelos (tablas) y relaciones
└── migrations/            # Historial de migraciones
database/
└── seed.sql               # Datos de prueba (5 o más registros por tabla)
src/
├── main.ts                # Punto de entrada y ValidationPipe global
├── generated/prisma/      # Prisma Client generado (no se versiona)
└── modules/
    ├── app/               # Módulo raíz (AppModule)
    ├── prisma/            # PrismaService y PrismaModule (global)
    ├── products/          # Productos
    ├── categories/        # Categorías
    ├── users/             # Usuarios
    ├── auth/              # Registro e inicio de sesión
    ├── orders/            # Pedidos
    └── contact/           # Mensajes de contacto
prisma7.config.ts          # Configuración de Prisma 7 (conexión a la base)


Cada módulo incluye su carpeta `dto/`, un controller (recibe la petición), un service (lógica y acceso a la base) y su módulo. Todos están importados en `AppModule`.

**Recorrido de una petición:** el `ValidationPipe` valida el cuerpo con el DTO, el controller recibe la solicitud y llama al service, el service usa Prisma Client para consultar o modificar PostgreSQL, y la API devuelve el resultado en JSON.

## Endpoints

### Recursos con CRUD completo

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/recurso` | Crear |
| GET | `/recurso` | Listar todos |
| GET | `/recurso/:id` | Obtener uno por id |
| PATCH | `/recurso/:id` | Actualizar |
| DELETE | `/recurso/:id` | Eliminar |

Recursos: `products`, `categories`, `orders` y `contact`. Ejemplo: `http://localhost:4000/products`.

### Usuarios

Los usuarios **no se crean en `/users`**: para evitar duplicar la operación, se registran desde `/auth/register`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/users` | Listar usuarios (sin contraseñas) |
| GET | `/users/:id` | Obtener un usuario |
| PATCH | `/users/:id` | Actualizar nombre o correo |
| DELETE | `/users/:id` | Eliminar (falla si tiene pedidos) |

### Autenticación

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/auth/register` | Registrar un usuario (rol `customer`) |
| POST | `/auth/login` | Iniciar sesión; devuelve `access_token` (JWT, vence en 1 hora) y los datos del usuario |

Ejemplo de registro:

json
{
  "name": "Xavier Test",
  "email": "xavier@mail.com",
  "password": "Noir1234"
}


## Validación de datos (DTOs)

Los DTOs definen qué datos espera cada operación. Si no se cumplen, la API responde **400 Bad Request** con la lista de errores.

| DTO | Reglas principales |
| --- | --- |
| `CreateProductDto` | `name` texto no vacío (máx. 150), `price` número ≥ 0, `stock` entero ≥ 0, `on_sale` booleano opcional, `category_id` entero positivo |
| `CreateCategoryDto` | `name` texto no vacío (máx. 50) |
| `CreateOrderDto` | `user_id` entero positivo, `status` uno de los estados válidos, `total` número ≥ 0, `items` con al menos un ítem válido |
| `CreateContactDto` | `name` y `subject` texto no vacío, `email` con formato válido, `message` de al menos 10 caracteres |
| `RegisterAuthDto` | `name` de 2 a 100 caracteres, `email` válido, `password` de 8 a 128 caracteres |
| `LoginAuthDto` | `email` válido y `password` no vacía |

## Códigos de respuesta

| Código | Cuándo ocurre |
| --- | --- |
| 200 / 201 | Operación exitosa / recurso creado |
| 400 | Datos inválidos o referencias que no existen |
| 401 | Correo o contraseña incorrectos |
| 404 | El recurso no existe |
| 409 | Valor repetido (correo o categoría) o recurso que no se puede eliminar porque tiene datos asociados |

## Base de datos

Base relacional en PostgreSQL llamada `noir_db`. Las tablas se crean con **migraciones de Prisma** a partir de `prisma/schema.prisma`:

| Tabla | Descripción |
| --- | --- |
| `categories` | Categorías de productos |
| `users` | Usuarios, con `password_hash` y rol (`customer` o `admin`) |
| `products` | Productos, con clave foránea a `categories` |
| `orders` | Pedidos, con clave foránea a `users` |
| `order_items` | Ítems de cada pedido (relación N a M entre `orders` y `products`) |
| `contact_messages` | Mensajes del formulario de contacto |

> Los campos `price` y `total` se guardan como `Decimal`, por eso la API los devuelve como texto en el JSON (por ejemplo `"89990"`).

## Instalación y ejecución

1. Instalar [Node.js](https://nodejs.org/) y [PostgreSQL](https://www.postgresql.org/download/).
2. Clonar el repositorio:
   bash
   git clone https://github.com/xaviervictory/noir-backend.git
   cd noir-backend
   
3. Instalar las dependencias:
   bash
   npm install
   
   > El proyecto usa **Prisma 7**. No actualizar Prisma a otra versión mayor.
4. Crear el archivo `.env` a partir de `.env.example` (ver la sección siguiente).
5. Crear una base de datos vacía llamada `noir_db` (por ejemplo, desde pgAdmin).
6. Generar el cliente de Prisma y aplicar las migraciones:
   bash
   npx prisma generate
   npx prisma migrate dev --name init
   
7. Cargar los datos de prueba ejecutando `database/seed.sql` en el Query Tool de pgAdmin.
8. Iniciar el servidor en modo desarrollo:
   bash
   npm run start:dev
   

La API queda disponible en `http://localhost:4000`.

> Los usuarios del `seed.sql` tienen contraseñas de ejemplo que no sirven para iniciar sesión. Para probar el login, registrar un usuario nuevo con `POST /auth/register`.

### Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run start:dev` | Inicia el servidor y recarga al guardar |
| `npm run build` | Compila el proyecto |
| `npm run start:prod` | Ejecuta la versión compilada |

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

env
PORT=4000
DATABASE_URL="postgresql://usuario:password@localhost:5432/noir_db?schema=public"
API_BASE_URL=http://localhost:4000/
JWT_SECRET=un_valor_largo_y_secreto


| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto en el que corre la API |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL |
| `API_BASE_URL` | URL base de la API |
| `JWT_SECRET` | Clave con la que se firman los tokens JWT |

> El archivo `.env` está incluido en `.gitignore` y **no se sube al repositorio**. El archivo `.env.example` sirve como plantilla, con valores de ejemplo.

## Pruebas y documentación con Postman

La colección `NOIR-API.postman_collection.json` incluye una carpeta por módulo con las peticiones de cada endpoint.

1. Abrir Postman e importar el archivo de la colección.
2. Verificar la variable `base_url` (por defecto `http://localhost:4000`).
3. Ejecutar `npm run start:dev` y enviar las peticiones.

La petición de **Login** guarda automáticamente el token en la variable `token` de la colección. Para probar localhost desde Postman en el navegador hace falta el Desktop Agent, o usar la aplicación de escritorio.

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

- Proteger rutas con un guard que verifique el JWT.
- Restringir operaciones según el rol (`customer` o `admin`).
- Documentar la API con Swagger.
- Conectar el frontend de NOIR con esta API.
- Publicar el backend en un servicio de hosting.

## Autor

Proyecto desarrollado por **Xavier**