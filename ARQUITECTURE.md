# Arquitectura del Proyecto Richard 3D

Este documento describe la arquitectura del proyecto, sus principios de diseño y la organización del código.

## Visión General

El proyecto sigue una arquitectura **feature-first** combinada con una **capa de UI reutilizable**, diseñada para mantener el código modular, escalable y fácil de mantener.

## Principios Arquitectónicos

1. **Separación de Concerns**: Cada feature es independiente y autocontenida
2. **Reutilización**: Componentes y utilidades genéricas en `shared/`
3. **Tipado Estricto**: TypeScript en modo strict sin `any` no tipado
4. **Server-First**: Server Components por defecto, Client Components solo cuando sea necesario
5. **Seguridad**: RLS (Row Level Security) en Supabase, separación cliente/servidor

## Estructura de Directorios

```
src/
├── app/                    # Next.js App Router (rutas y layouts)
│   ├── layout.tsx          # Layout raíz de la aplicación
│   └── page.tsx            # Página principal
│
├── features/               # Features de negocio (feature-first)
│   └── [feature-name]/     # Cada feature es un módulo independiente
│       ├── components/     # Componentes específicos del feature
│       ├── hooks/          # Hooks específicos del feature
│       ├── services/       # Lógica de negocio y llamadas a Supabase
│       ├── types.ts        # Tipos TypeScript del feature
│       └── constants.ts    # Constantes del feature
│
├── shared/                 # Código compartido y reutilizable
│   ├── ui/                 # Componentes UI agnósticos al dominio
│   ├── hooks/              # Hooks reutilizables (useMediaQuery, etc.)
│   └── lib/                # Utilidades genéricas (formatters, validators)
│
├── lib/                    # Configuración global
│   ├── supabase/           # Clientes y helpers de Supabase
│   │   ├── client.ts       # Cliente para Client Components
│   │   ├── server.ts       # Cliente para Server Components
│   │   ├── middleware.ts   # Helper para actualizar sesiones
│   │   └── index.ts        # Exportaciones centralizadas
│   └── utils.ts            # Utilidades generales (cn, etc.)
│
├── components/             # Componentes base de ShadCN UI
│   └── ui/                 # Componentes instalados de ShadCN
│
├── types/                  # Tipos globales compartidos
│   └── index.ts            # Tipos comunes (User, Role, Pagination, etc.)
│
├── styles/                 # Estilos globales
│   └── globals.css         # Estilos globales de Tailwind
│
└── middleware.ts           # Middleware de Next.js (actualización de sesiones)
```

## Capas de la Arquitectura

### 1. Capa de Rutas (`src/app/`)

**Responsabilidad**: Definir las rutas de la aplicación usando Next.js App Router.

- **Server Components por defecto**: Todas las páginas son Server Components a menos que se marquen con `"use client"`
- **Layouts**: Estructura común de páginas (headers, footers, navegación)
- **Metadata**: Configuración SEO y metadatos de páginas

**Ejemplo**:
```tsx
// src/app/dashboard/page.tsx
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout"

export default function DashboardPage() {
  return <DashboardLayout />
}
```

### 2. Capa de Features (`src/features/`)

**Responsabilidad**: Contener toda la lógica de negocio organizada por dominio.

Cada feature sigue esta estructura:

```
feature-name/
├── components/          # Componentes de UI específicos del feature
│   ├── feature-form.tsx
│   └── feature-list.tsx
├── hooks/              # Hooks con lógica específica del feature
│   ├── use-feature-data.ts
│   └── use-feature-actions.ts
├── services/           # Lógica de negocio y llamadas a Supabase
│   ├── feature-service.ts
│   └── feature-queries.ts
├── types.ts            # Tipos TypeScript específicos del feature
└── constants.ts        # Constantes relacionadas con el feature
```

**Principios**:
- **Autocontención**: Cada feature tiene todo lo necesario para funcionar
- **Aislamiento**: Los features no importan directamente de otros features
- **Comunicación**: Entre features se hace a través de servicios compartidos o eventos

**Ejemplo de Feature (Auth)**:
```
auth/
├── components/
│   ├── login-form.tsx      # Formulario de login
│   └── signup-form.tsx     # Formulario de registro
├── hooks/
│   └── use-auth.ts         # Hook para gestión de autenticación
├── services/
│   └── auth-service.ts     # Llamadas a Supabase Auth
├── types.ts                # User, AuthResponse, etc.
└── constants.ts            # RUTAS_AUTH, MENSAJES_ERROR, etc.
```

### 3. Capa de UI Compartida (`src/shared/`)

**Responsabilidad**: Proporcionar componentes y utilidades reutilizables.

#### `src/shared/ui/`
Componentes de UI agnósticos al dominio que pueden usarse en múltiples features:
- Wrappers de ShadCN UI (instalados en `src/components/ui/`)
- Componentes genéricos (botones, cards, layouts)
- Componentes visuales/interactivos de HeroUI cuando sea necesario

**Regla**: Si un componente necesita lógica específica de un feature, debe ir en `src/features/[feature]/components/`

#### `src/shared/hooks/`
Hooks reutilizables que no pertenecen a un feature específico:
- `useMediaQuery` - Detectar breakpoints
- `useScrollToSection` - Navegación suave
- `useDebounce` - Optimización de búsquedas

#### `src/shared/lib/`
Utilidades genéricas:
- Formateadores (fechas, monedas, números)
- Validadores (emails, URLs, etc.)
- Helpers genéricos

### 4. Capa de Configuración (`src/lib/`)

**Responsabilidad**: Configuración global y clientes de servicios externos.

#### `src/lib/supabase/`
Configuración de Supabase con soporte SSR:

- **`client.ts`**: Cliente para Client Components (navegador)
  ```tsx
  "use client"
  import { createClient } from "@/lib/supabase"
  const supabase = createClient()
  ```

- **`server.ts`**: Cliente para Server Components (servidor)
  ```tsx
  import { createClient } from "@/lib/supabase/server"
  const supabase = await createClient()
  ```

- **`middleware.ts`**: Helper para actualizar sesiones en el middleware

**Seguridad**:
- Las claves de Supabase están en variables de entorno
- RLS (Row Level Security) se respeta automáticamente
- Separación clara entre cliente y servidor

### 5. Capa de Tipos Globales (`src/types/`)

**Responsabilidad**: Definir tipos TypeScript compartidos entre múltiples features.

Ejemplos:
- `User` - Tipo de usuario base
- `Role` - Roles del sistema
- `Pagination<T>` - Estructura de paginación genérica

**Regla**: Si un tipo solo se usa en un feature, debe ir en `src/features/[feature]/types.ts`

## Flujo de Datos

### 1. Server Components → Supabase

```tsx
// Server Component
import { createClient } from "@/lib/supabase/server"
import { getFeatureData } from "@/features/feature/services/feature-service"

export default async function FeaturePage() {
  const supabase = await createClient()
  const data = await getFeatureData(supabase)
  return <FeatureList data={data} />
}
```

### 2. Client Components → Supabase

```tsx
"use client"
import { createClient } from "@/lib/supabase"
import { useFeatureData } from "@/features/feature/hooks/use-feature-data"

export function FeatureComponent() {
  const { data, loading } = useFeatureData()
  // ...
}
```

### 3. Middleware → Supabase

El middleware actualiza automáticamente las sesiones de usuario en cada request:

```tsx
// src/middleware.ts
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
```

## Convenciones de Código

### Nomenclatura

- **Archivos**: `kebab-case` (ej: `user-profile.tsx`, `auth-service.ts`)
- **Componentes**: `PascalCase` (ej: `UserProfile`, `LoginForm`)
- **Hooks**: `useCamelCase` (ej: `useAuth`, `useFeatureData`)
- **Funciones/Variables**: `camelCase` (ej: `getUserData`, `isLoading`)
- **Carpetas**: `kebab-case` (ej: `user-profile/`, `auth/`)
- **Tipos/Interfaces**: `PascalCase` (ej: `User`, `AuthResponse`)

### Componentes

- **Server Components por defecto**: Solo usar `"use client"` cuando sea necesario
- **Props tipadas**: Siempre definir tipos para las props de componentes
- **Componentes pequeños**: Evitar componentes gigantes, dividir responsabilidades

### Servicios

- **No llamadas directas en componentes**: Usar servicios en `features/[feature]/services/`
- **Funciones puras cuando sea posible**: Facilitar testing y mantenimiento
- **Manejo de errores**: Siempre manejar errores de Supabase apropiadamente

### Estilos

- **Tailwind CSS**: Sistema de estilos principal
- **ShadCN UI**: Componentes base (inputs, botones, modales, etc.)
- **HeroUI**: Solo para elementos visuales/interactivos especiales
- **Sin estilos inline**: Excepto casos muy puntuales

## Separación Cliente/Servidor

### Server Components (por defecto)
- Acceso directo a base de datos
- No pueden usar hooks de React
- No pueden usar APIs del navegador
- Mejor para SEO y rendimiento

### Client Components (`"use client"`)
- Estado local con `useState`, `useEffect`
- Eventos del navegador
- Interactividad del usuario
- APIs del navegador

**Regla**: Usar Server Components siempre que sea posible, Client Components solo cuando sea necesario.

## Middleware y Autenticación

El middleware de Next.js está configurado para:
- Actualizar sesiones de Supabase automáticamente
- Refrescar tokens expirados
- Mantener la autenticación entre requests

**Configuración**:
```tsx
// src/middleware.ts
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
```

## Dependencias Principales

- **Next.js 14+**: Framework React con App Router
- **TypeScript**: Tipado estático estricto
- **Tailwind CSS**: Sistema de utilidades CSS
- **Supabase**: Backend como servicio con SSR
- **ShadCN UI**: Componentes de UI principales
- **HeroUI**: Componentes visuales/interactivos complementarios

## Mejores Prácticas

1. **No crear código sin necesidad**: No añadir features, rutas o componentes sin que el usuario lo pida
2. **No instalar dependencias sin consultar**: Preguntar antes de añadir nuevas librerías
3. **Mantener código limpio**: Sin código muerto, imports sin usar, o TODOs genéricos
4. **Accesibilidad**: Siempre incluir `aria-*`, `focus-visible`, labels asociados
5. **Documentación**: Comentar código complejo, explicar decisiones arquitectónicas

## Extensión del Proyecto

Al añadir nuevas features:

1. Crear carpeta en `src/features/[feature-name]/`
2. Seguir la estructura estándar (components, hooks, services, types.ts, constants.ts)
3. Usar componentes de `shared/ui` cuando sea posible
4. Definir tipos específicos en `types.ts` del feature
5. Crear servicios para llamadas a Supabase en `services/`
6. No importar directamente de otros features

## Ejemplo Completo: Flujo de un Feature

```
1. Usuario visita /dashboard
   ↓
2. Server Component (src/app/dashboard/page.tsx)
   ↓
3. Llama a servicio (src/features/dashboard/services/dashboard-service.ts)
   ↓
4. Servicio usa cliente Supabase (src/lib/supabase/server.ts)
   ↓
5. Datos retornados al componente
   ↓
6. Componente renderiza usando componentes de shared/ui
   ↓
7. Si hay interactividad, Client Component maneja eventos
   ↓
8. Client Component usa hooks del feature para actualizar estado
   ↓
9. Hook llama a servicio que actualiza Supabase
```

Esta arquitectura garantiza:
- **Modularidad**: Features independientes y fáciles de mantener
- **Escalabilidad**: Fácil añadir nuevas features sin afectar existentes
- **Reutilización**: Componentes y utilidades compartidas
- **Tipado**: TypeScript estricto en toda la aplicación
- **Seguridad**: Separación cliente/servidor y RLS en Supabase

