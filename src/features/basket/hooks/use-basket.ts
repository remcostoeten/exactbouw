import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import { getProducts } from '../services/product-service'
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemCount,
  selectBasketItemQuantity,
  selectBasketTotal
} from '../store/basket-slice'

export const useBasket = () => {
  const dispatch = useAppDispatch()
  const products = getProducts()
  const itemCount = useAppSelector(selectBasketItemCount)
  const totalCost = useAppSelector(state => selectBasketTotal(state, products))

  return {
    itemCount,
    totalCost,
    getItemQuantity: (sku: number) => useAppSelector(state =>
      selectBasketItemQuantity(state, sku)
    ),
    addItem: (sku: number) => dispatch(addToBasket({ sku })),
    removeItem: (sku: number) => dispatch(removeFromBasket({ sku }))
  }
}
