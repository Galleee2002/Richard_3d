// Tipos globales compartidos
// Ejemplos: User, Role, Pagination, etc.

// Placeholder - añade tus tipos globales aquí
export type User = {
  id: string
  email: string
  // ... otros campos
}

export type Role = "admin" | "user" | "guest"

export type Pagination<T> = {
  data: T[]
  page: number
  pageSize: number
  total: number
}

