import { Product } from '../types/basket'

const MOCK_PRODUCTS: Product[] = [
    {
        sku: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        stock: 10,
        maxQty: 2,
        image: "https://source.unsplash.com/random/400x400/?headphones"
    },
    {
        sku: 2,
        name: "Smart Watch Pro",
        description: "Advanced smartwatch with health tracking features",
        price: 299.99,
        stock: 15,
        maxQty: 1,
        image: "https://source.unsplash.com/random/400x400/?smartwatch"
    },
    {
        sku: 3,
        name: "4K Gaming Monitor",
        description: "Ultra-wide 4K gaming monitor with HDR",
        price: 499.99,
        stock: 5,
        maxQty: 1,
        image: "https://source.unsplash.com/random/400x400/?monitor"
    },
    {
        sku: 4,
        name: "Mechanical Keyboard",
        description: "RGB mechanical gaming keyboard with custom switches",
        price: 129.99,
        stock: 20,
        maxQty: 2,
        image: "https://source.unsplash.com/random/400x400/?keyboard"
    },
    {
        sku: 5,
        name: "Gaming Mouse",
        description: "High-precision gaming mouse with adjustable DPI",
        price: 79.99,
        stock: 25,
        maxQty: 2,
        image: "https://source.unsplash.com/random/400x400/?mouse"
    },
    {
        sku: 6,
        name: "Laptop Stand",
        description: "Ergonomic aluminum laptop stand with cooling",
        price: 49.99,
        stock: 30,
        maxQty: 3,
        image: "https://source.unsplash.com/random/400x400/?laptop-stand"
    }
]

export const getProducts = () => MOCK_PRODUCTS

export const getProduct = (sku: number) =>
    MOCK_PRODUCTS.find(product => product.sku === sku)
