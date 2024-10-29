export interface Product {
  sku: number
  name: string
  description: string
  price: number
  basketLimit: number
}

export interface BasketItem {
  sku: number
  quantity: number
}

export interface BasketState {
  items: BasketItem[]
  cardNumber: string
  isCheckoutComplete: boolean
}

export interface ProductCardProps {
  product: Product
  quantity: number
  onAdd: (sku: number) => void
  onRemove: (sku: number) => void
}
