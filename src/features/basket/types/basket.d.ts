export type ViewMode = 'grid' | 'list'

export type Product = {
    sku: number
    name: string
    description: string
    price: number
    stock: number
    maxQty: number
    image: string
}

export type BasketItem = {
    sku: number
    quantity: number
}

export type Basket = {
    items: BasketItem[]
}
