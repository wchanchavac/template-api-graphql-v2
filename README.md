# Template Backend GraphQL v2

Este es un proyecto de plantilla para un backend con GraphQL usando Apollo Server.

## Estructura del Proyecto

A continuación, se detalla la estructura de carpetas y el propósito de cada una dentro del proyecto:

- **/api**: Contiene el punto de entrada principal del servidor, generalmente configurado para entornos sin servidor (serverless) como Vercel.
- **/secrets**: Almacena las claves criptográficas (pública y privada) y los archivos JWKS generados. **Esta carpeta debe estar en el `.gitignore`**.
- **/src**: Es el corazón de la aplicación y contiene todo el código fuente.
  - **/src/auth**: Lógica relacionada con la autenticación, como estrategias de contraseña y gestión de tokens.
  - **/src/config**: Archivos de configuración, como la conexión a la base de datos.
  - **/src/database**: Contiene la configuración de Sequelize, las migraciones, seeders y los modelos de la base de datos.
    - **/src/database/models**: Definición de todos los modelos de Sequelize que mapean a las tablas de la base de datos.
  - **/src/graphql**: Define todo lo relacionado con la API de GraphQL.
    - **/src/graphql/resolvers**: Implementación de los resolvers para cada tipo de dato de GraphQL. Aquí es donde se define cómo se obtienen los datos.
    - **/src/graphql/types**: Definición de los esquemas de GraphQL (`.graphql`), donde se describen los tipos de datos y las operaciones disponibles.
  - **/src/loaders**: Implementación de `DataLoader` para optimizar las consultas a la base de datos, evitando el problema N+1.
  - **/src/shared**: Código reutilizable y utilidades que pueden ser compartidas a través de diferentes partes de la aplicación.
- **vercel.json**: Archivo de configuración específico para el despliegue en la plataforma Vercel.

## Requisitos

- Node.js
- bun

## Instalación

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```sh
   cd template-backend-graphql-v2
   ```
3. Instala las dependencias:
   ```sh
   bun install
   ```

## Configuración

Antes de iniciar el servidor por primera vez, es crucial generar un par de claves criptográficas (pública y privada). Estas claves son utilizadas para firmar y verificar los JSON Web Tokens (JWT), asegurando la comunicación entre el cliente y el servidor.

Para generar un nuevo par de claves, ejecuta el siguiente comando:

```sh
bun run generate:secret
```

Este comando creará tres archivos en el directorio `secrets/`:

1.  **Clave Privada**: Un archivo `.pem` con un nombre detallado que incluye el algoritmo y un identificador único. Ejemplo: `jwt-ed25519-ed25519-access-prod-xxxx.pem`.
2.  **Clave Pública**: Un archivo `.pub.pem` correspondiente a la clave privada.
3.  **JSON Web Key Set (JWKS)**: Un archivo `jwks-prod-YYYYMMDD.json` que contiene la clave pública en formato JWK, necesario para que los clientes puedan verificar las firmas de los tokens.

**¡Importante!** Almacena estas claves de manera segura y nunca compartas la clave privada. Asegúrate de que el directorio `secrets/` esté incluido en tu archivo `.gitignore` para evitar subir las claves a tu repositorio de control de versiones.

### Variables de Entorno

Para que la aplicación funcione correctamente, es necesario configurar las siguientes variables de entorno. Puedes crear un archivo `.env` en la raíz del proyecto a partir del archivo `.env.example`.

#### Base de Datos

- `DB_SERVICE_NAME`: (Oracle) El nombre del servicio de la base de datos de Oracle. Usar en lugar de `DB_DATABASE`.
- `DB_DATABASE`: (MySQL/Postgres) El nombre de la base de datos.
- `DB_USERNAME`: El nombre de usuario para la conexión a la base de datos.
- `DB_PASSWORD`: La contraseña para la conexión a la base de datos.
- `DB_HOST`: El host donde se encuentra la base de datos.
- `DB_PORT`: El puerto de conexión de la base de datos.
- `DB_SCHEMA`: (Postgres) El esquema a utilizar en la base de datos de PostgreSQL.

#### Autenticación JWT

- `JWT_ED25519_PRIVATE_KEY`: El contenido del archivo de la clave privada `.pem` que se generó.
- `JWT_ED25519_PUBLIC_KEY`: El contenido del archivo de la clave pública `.pub.pem` que se generó.
- `JWT_JWKS_ACTIVE_KID`: El `kid` (Key ID) de la clave que está actualmente activa. Este valor se encuentra dentro del archivo JWKS generado.
- `JWT_ISSUER`: El emisor del token (tu dominio o identificador de la aplicación).
- `JWT_AUDIENCE`: La audiencia del token (el destinatario previsto del token).

## Uso

Para iniciar el servidor en modo de desarrollo, ejecuta:

```sh
bun run dev
```

El servidor estará corriendo en [http://localhost:4000](http://localhost:4000).
