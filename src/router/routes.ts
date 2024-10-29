export const ROUTES = {
  HOME: '/',
  CHECKOUT: '/checkout'
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = typeof ROUTES[RouteKey]
