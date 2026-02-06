# 🛡️ Guía de Defensa Técnica - Bulltrack Pro Backend

Este documento sirve como guía para defender las decisiones técnicas, la arquitectura y la implementación del proyecto **Bulltrack Pro Backend** ante una entrevista técnica.

---

## 1. Arquitectura del Proyecto

El proyecto sigue una **Arquitectura Hexagonal (Puertos y Adaptadores)**, implementada sobre **NestJS**.

### 🏛️ Estructura de Carpetas
```
src/
├── domain/           # 🧠 Lógica pura de negocio (Entities, Repository Interfaces)
├── application/      # ⚙️ Casos de Uso (Orquestación: UseCase Classes)
├── infrastructure/   # 🔌 Implementaciones externas (Database, Controllers, Auth)
```

### 🗣️ ¿Por qué esta arquitectura? (Pitch de Venta)
> "Elegí Arquitectura Hexagonal para **desacoplar** la lógica de negocio de los detalles de implementación."

*   **Independencia de Frameworks/Bases de Datos**: La capa `domain` no sabe que existe Prisma o NestJS. Si mañana cambiamos PostgreSQL por MongoDB, el dominio no cambia; solo creamos un nuevo adaptador en `infrastructure`.
*   **Testabilidad**: Al usar Inyección de Dependencias e Interfaces (`IBullRepository`), puedo mockear fácilmente la base de datos para testear la lógica de negocio unitariamente.
*   **Mantenibilidad**: Código limpio y organizado. Cada archivo tiene una única responsabilidad clara.

---

## 2. Tecnologías y Decisiones Clave

| Tecnología | Rol | ¿Por qué se eligió? |
| :--- | :--- | :--- |
| **NestJS** | Framework | Provee una estructura modular, Inyección de Dependencias (DI) nativa y soporte TypeScript de primera clase. Es el estándar empresarial para Node.js. |
| **Prisma ORM** | Data Layer | Type-safety extremo. Evita errores de SQL manual y facilita las migraciones y el seeding de datos. |
| **PostgreSQL** | Base de Datos | Robusta, relacional y perfecta para datos estructurados como los registros de toros y usuarios. |
| **JWT (Passport)**| Seguridad | Stateless authentication. Escalable y estándar para APIs REST. |

---

## 3. Funcionalidades Clave y "Wow Factors"

### 🐂 Cálculo Dinámico del Score (`BullScore`)
*   **Reto**: Calcular una puntuación compleja basada en múltiples estadísticas.
*   **Solución**: Implementé lógica de dominio rica dentro de la entidad `Bull` (`calculateScore()`) y decidí **persistir** este valor en la base de datos (`bull_score`).
*   **Defensa**: "Persistir el score permite ordenar y filtrar (ORDER BY) a nivel de base de datos, lo cual es mucho más performante que calcularlo en memoria para miles de registros."

### ⭐ Sistema de Favoritos
*   **Arquitectura**: Implementado en un módulo separado (`FavoritesModule`) para mantener cohesión. Separé `PrismaBullRepository` y `PrismaFavoriteRepository` siguiendo el principio de Responsabilidad Única (SRP).
*   **Integración**: El endpoint `GET /bulls` es inteligente; si detecta un usuario logueado, cruza datos para marcar `isFavorite: true` sin hacer N+1 queries gracias a la optimización en el repositorio.

### 🔍 Filtros y Paginación Avanzada
*   **Detalle**: El repositorio construye dinámicamente la cláusula `WHERE` de Prisma basándose en los DTOs de entrada. Esto hace que el código sea limpio y extensible.

---

## 4. Buenas Prácticas Aplicadas

1.  **Dependency Injection (DI)**:
    *   Uso de tokens (`BULL_REPOSITORY_TOKEN`) para inyectar implementaciones concretas en las interfaces. Esto aplica el principio de **Inversión de Dependencias (D del SOLID)**.
2.  **Repository Pattern**:
    *   La capa de aplicación (`UseCases`) solo habla con interfaces (`IBullRepository`). Nunca toca Prisma directamente.
3.  **DTOs y Validación**:
    *   Uso de tipos estrictos y Pipes de validación (`ParseIntPipe`) en los controladores.
4.  **Separation of Concerns**:
    *   Controller: Solo maneja HTTP (req/res).
    *   UseCase: Solo orquesta lógica.
    *   Repository: Solo accede a datos.

---

## 5. Posibles Preguntas de Entrevista y Respuestas

**Q: ¿Por qué usaste `Prisma` y no `TypeORM`?**
*   A: "Prisma ofrece un type-safety superior generada a partir del esquema. Esto reduce errores en tiempo de ejecución drasticamente comparado con TypeORM."

**Q: ¿Cómo escalarías esta aplicación?**
*   A: "Gracias a que la autenticación es stateless (JWT), podemos escalar horizontalmente agregando más instancias del servidor detrás de un Load Balancer sin problemas de sesión."

**Q: ¿Qué mejorarías si tuvieras más tiempo?**
*   A: "Agregaría índices en la base de datos para las columnas de filtrado (`uso`, `origen`, `bull_score`) para mejorar la velocidad de lectura, y añadiría tests unitarios más exhaustivos para la lógica de dominio."

---
*Documento generado por tu Asistente de IA para Bulltrack Pro.*
