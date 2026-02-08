# Bulltrack Pro - Backend 🐂

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Este es el repositorio del backend para **Bulltrack Pro**, una plataforma avanzada para el seguimiento y gestión de ganado. 

Este backend provee la API necesaria para gestionar toros, usuarios y favoritos, con un sistema de puntuación dinámico para el rendimiento ganadero.

---

## 🔗 Enlaces Rápidos

- **Despliegue en Producción:** [https://valiant-grace-production.up.railway.app/](https://valiant-grace-production.up.railway.app/)
- **Repositorio Frontend:** [JoniAguero/bulltrack_pro_frontend](https://github.com/JoniAguero/bulltrack_pro_frontend)

---

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Hexagonal (Puertos y Adaptadores)** y **Clean Architecture** para garantizar un código desacoplado, testeable y mantenible.

### Estructura de Directorios
- `src/domain`: Contiene las entidades de negocio y las interfaces de los repositorios (reglas de negocio puras).
- `src/application`: Contiene los casos de uso (lógica de aplicación) que coordinan el flujo de datos.
- `src/infrastructure`: Implementaciones concretas de los puertos.
  - `http`: Controladores de API NestJS y DTOs.
  - `persistence`: Repositorios implementados con Prisma.
  - `modules`: Módulos de configuración de NestJS.

---

## 🚀 Tecnologías Principales

- **Framework:** [NestJS](https://nestjs.com/)
- **Lenguaje:** TypeScript
- **ORM:** [Prisma](https://www.prisma.io/)
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Hashing:** Bcrypt
- **Ejecución TS:** [tsx](https://github.com/privatenumber/tsx) (Para seeding rápido y compatible con ESM)

---

## 🛠️ Configuración Local

Si deseas levantar el servidor en tu entorno local, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone https://github.com/JoniAguero/bulltrack_pro_backend.git
cd bulltrack_pro_backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto basándote en el siguiente ejemplo:

```env
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/bulltrack_db?schema=public"
JWT_SECRET="tu_secreto_super_seguro"
PORT=3001
```

### 4. Preparar la Base de Datos
Asegúrate de tener una instancia de PostgreSQL corriendo. Luego ejecuta:

```bash
# Generar el cliente de Prisma
npx prisma generate

# Sincronizar el esquema con la DB
npx prisma db push

# Poblar la base de datos con datos de prueba (Seed)
npx prisma db seed
```
> [!NOTE]  
> El comando de seed utiliza `tsx` para garantizar compatibilidad con las últimas versiones de Node.js.

### 5. Iniciar el servidor
```bash
# Modo desarrollo con recarga automática
npm run start:dev
```

El servidor estará disponible por defecto en `http://localhost:3001`.

---

## 🐳 Docker (Opcional)

El proyecto incluye un `Dockerfile` multietapa optimizado para producción. Si deseas correrlo con Docker:

```bash
docker build -t bulltrack-backend .
docker run -p 3001:3001 --env-file .env bulltrack-backend
```

---

## 📊 Endpoints Principales

- `POST /auth/login`: Autenticación de usuarios.
- `POST /auth/register`: Registro de nuevos usuarios.
- `GET /bulls`: Listado de toros con filtros avanzados.
- `GET /bulls/:id`: Detalle de un toro específico.
- `POST /favorites/toggle`: Alternar favoritos para el usuario autenticado.

---

Desarrollado con ❤️ para el sector ganadero.
