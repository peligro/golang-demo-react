# Tamila SAAS - Frontend React

Frontend para la plataforma Tamila SAAS, construido con React + TypeScript + Bootstrap.

## 🚀 Tecnologías

- React 19 + TypeScript
- Vite (build tool)
- Bootstrap 5 + Font Awesome
- React Router v7
- Axios para HTTP requests

## 🔐 Autenticación

- Login con cookies HTTP-only
- Sesiones gestionadas por backend Go (Redis)
- ProtectedRoute para rutas privadas

## 📁 Estructura

```text
src/
├── components/          # Componentes reutilizables (Header, Sidebar, Footer)
├── context/             # AuthContext para estado global de autenticación
├── modules/             # Vistas por módulo (login, admin, home, etc.)
│   ├── admin/           # Panel de administración
│   ├── error/           # Páginas de error (404, 500)
│   ├── help/            # Página de ayuda
│   ├── home/            # Dashboard principal
│   ├── no_access/       # Página de acceso denegado
│   └── seguridad/       # Login, reset password, servicios de auth
├── common/              # Helpers, interfaces, componentes UI compartidos
│   ├── helpers/         # Funciones utilitarias
│   ├── interfaces/      # Tipos TypeScript compartidos
│   └── ui/              # Componentes UI reutilizables (AlertCustom, etc.)
├── services/            # Servicios de API (authService.ts)
├── App.tsx              # Componente raíz
├── main.tsx             # Punto de entrada
└── router.tsx           # Configuración de rutas con react-router-dom
```

## 🔗 Backend

```text
API Go: https://github.com/peligro/golang-demo

Endpoints de autenticación:
  POST /auth/login     → Iniciar sesión (crea cookie HTTP-only)
  GET  /auth/me        → Obtener datos del usuario autenticado
  POST /auth/logout    → Cerrar sesión (invalida sesión en Redis)
  POST /auth/refresh   → Renovar TTL de sesión (opcional)

Base de datos: PostgreSQL (vía GORM)
Sesiones: Redis (TTL configurable, default: 24h)
```

## 📦 Variables de entorno
### Crear .env basado en .env.example:

```env
# URL de la API Go (backend)
VITE_API_URL=http://localhost:8082

# Entorno (local, staging, production)
# VITE_ENVIRONMENT=local
```
### ⚠️ Importante: El archivo .env no debe subirse al repositorio. Agrega .env y .env.* a tu .gitignore.


## ⚙️ Desarrollo

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

Tamila SAAS - Tu asistente de gestión inteligente
© 2026 César Cancino - cesarcancino.com