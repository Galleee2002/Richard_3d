# Configuración de Supabase

Este directorio contiene la configuración de Supabase para el proyecto.

## Archivos

- **`client.ts`**: Cliente de Supabase para Client Components (navegador)
- **`server.ts`**: Cliente de Supabase para Server Components (servidor)
- **`middleware.ts`**: Helper para actualizar sesiones en el middleware de Next.js
- **`index.ts`**: Exportaciones centralizadas

## Uso

### En Client Components

```tsx
"use client"

import { createBrowserClient } from "@/lib/supabase"

export function ClientComponent() {
  const supabase = createBrowserClient()
  
  // Usar supabase aquí
}
```

### En Server Components

```tsx
import { createServerClient } from "@/lib/supabase"

export async function ServerComponent() {
  const supabase = await createServerClient()
  
  // Usar supabase aquí
}
```

### En Middleware

El middleware ya está configurado para actualizar las sesiones automáticamente. No necesitas hacer nada adicional.

## Variables de Entorno Requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave
```

## Row Level Security (RLS)

Asegúrate de configurar las políticas RLS en Supabase para proteger tus datos. El cliente está configurado para respetar estas políticas automáticamente.

