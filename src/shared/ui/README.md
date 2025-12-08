# Componentes UI Compartidos

Esta carpeta contiene componentes de UI reutilizables y agnósticos al dominio.

## Estructura

- **Wrappers de ShadCN UI**: Componentes base de ShadCN instalados en `src/components/ui/`
- **Wrappers de HeroUI**: Componentes visuales/interactivos de HeroUI cuando sea necesario
- **Componentes genéricos**: Botones, cards, layouts, etc. que pueden usarse en múltiples features

## Uso

```tsx
// Importar componentes de ShadCN UI
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Importar componentes compartidos
import { GenericCard } from "@/shared/ui/generic-card"
```

## Convenciones

- Los componentes deben ser agnósticos al dominio de negocio
- Si un componente necesita lógica específica de un feature, debe ir en `src/features/[feature]/components/`
- Todos los componentes deben ser accesibles (ARIA, focus visible, etc.)

