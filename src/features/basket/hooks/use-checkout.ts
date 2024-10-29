import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import { getProducts } from '../services/product-service'
import {
    completeCheckout,
    removeAllItems,
    resetCheckout,
    selectBasketItemCount,
    selectBasketItems,
    selectBasketTotal,
    selectCardNumber,
    selectIsCheckoutComplete,
    setCardNumber,
    updateQuantity
} from '../store/basket-slice'

interface CheckoutItem extends Basket.Product {
  quantity: number
  totalPrice: number
}

export const useCheckout = () => {
  const dispatch = useAppDispatch()
  const products = getProducts()

  // Basic basket state
  const items = useAppSelector(selectBasketItems)
  const itemCount = useAppSelector(selectBasketItemCount)
  const totalCost = useAppSelector(state => selectBasketTotal(state, products))

  // Checkout specific state
  const cardNumber = useAppSelector(selectCardNumber)
  const isCheckoutComplete = useAppSelector(selectIsCheckoutComplete)

  // Transform basket items to include product details and total price
  const basketItems = items.map(item => {
    const product = products.find(p => p.sku === item.sku)
    if (!product) return null
    return {
      ...product,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity
    }
  }).filter((item): item is CheckoutItem => item !== null)

  // Validate card number (must be 16 digits)
  const isCardValid = cardNumber.length === 16 && /^\d+$/.test(cardNumber)

  return {
    // Basket data
    items: basketItems,
    itemCount,
    totalCost,

    // Card data
    cardNumber,
    isCardValid,

    // Checkout state
    isCheckoutComplete,

    // Actions
    updateQuantity: (sku: number, quantity: number) => {
      if (quantity >= 1) {
        const product = products.find(p => p.sku === sku)
        if (product && quantity <= product.basketLimit) {
          dispatch(updateQuantity({ sku, quantity }))
        }
      }
    },
    removeAll: (sku: number) => dispatch(removeAllItems({ sku })),
    setCardNumber: (number: string) => dispatch(setCardNumber(number)),
    completeCheckout: () => {
      if (isCardValid && itemCount > 0) {
        dispatch(completeCheckout())
      }
    },
    resetCheckout: () => dispatch(resetCheckout())
  }
}
