# Features

Esta carpeta contiene las features de negocio organizadas de forma modular.

## Estructura de un Feature

Cada feature debe seguir esta estructura:

```
feature-name/
├── components/          # Componentes de UI específicos del feature
│   ├── feature-component.tsx
│   └── ...
├── hooks/              # Hooks específicos del feature
│   ├── use-feature-data.ts
│   └── ...
├── services/           # Lógica de negocio y llamadas a Supabase
│   ├── feature-service.ts
│   └── ...
├── types.ts            # Tipos TypeScript específicos del feature
└── constants.ts        # Constantes relacionadas con el feature
```

## Ejemplo: Feature de Autenticación

```
auth/
├── components/
│   ├── login-form.tsx
│   └── signup-form.tsx
├── hooks/
│   └── use-auth.ts
├── services/
│   └── auth-service.ts
├── types.ts
└── constants.ts
```

## Principios

- Cada feature es independiente y autocontenida
- La comunicación entre features se hace a través de servicios compartidos o eventos
- Los componentes de un feature pueden usar componentes de `shared/ui` pero no de otros features directamente

