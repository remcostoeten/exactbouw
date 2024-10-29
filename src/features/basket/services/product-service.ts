import type { Product } from '../types/basket'
const products: Product[] = [
  {
    "sku": 1,
    "name": "Red Product",
    "description": "Red Product description",
    "price": 1.01,
    "basketLimit": 5
  },
  {
    "sku": 2,
    "name": "Orange Product",
    "description": "Orange Product description",
    "price": 2.02,
    "basketLimit": 4
  },
  {
    "sku": 3,
    "name": "Yellow Product",
    "description": "Yellow Product description",
    "price": 3.03,
    "basketLimit": 3
  },
  {
    "sku": 4,
    "name": "Green Product",
    "description": "Green Product description",
    "price": 4.04,
    "basketLimit": 2
  },
  {
    "sku": 5,
    "name": "Blue Product",
    "description": "Blue Product description",
    "price": 5.05,
    "basketLimit": 1
  }
]

export const getProducts = (): Product[] => products

export const getProduct = (sku: number): Product | undefined =>
  products.find(product => product.sku === sku)

export const sampleBasket = {
  "basket": [
    {
      "sku": 1,
      "quantity": 5
    },
    {
      "sku": 3,
      "quantity": 1
    }
  ],
  "cardNumber": "5187447361867259"
}
