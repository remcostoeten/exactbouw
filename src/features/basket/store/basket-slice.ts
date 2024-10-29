import type { RootState } from '@/core/store/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Basket.BasketState = {
  items: [],
  cardNumber: '',
  isCheckoutComplete: false
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<{ sku: number }>) => {
      const existingItem = state.items.find(item => item.sku === action.payload.sku)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ sku: action.payload.sku, quantity: 1 })
      }
    },
    removeFromBasket: (state, action: PayloadAction<{ sku: number }>) => {
      const existingItem = state.items.find(item => item.sku === action.payload.sku)
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
      } else {
        state.items = state.items.filter(item => item.sku !== action.payload.sku)
      }
    },
    updateQuantity: (state, action: PayloadAction<{ sku: number; quantity: number }>) => {
      const item = state.items.find(item => item.sku === action.payload.sku)
      if (item) {
        item.quantity = action.payload.quantity
      }
    },
    removeAllItems: (state, action: PayloadAction<{ sku: number }>) => {
      state.items = state.items.filter(item => item.sku !== action.payload.sku)
    },
    setCardNumber: (state, action: PayloadAction<string>) => {
      state.cardNumber = action.payload
    },
    completeCheckout: (state) => {
      state.isCheckoutComplete = true
      state.items = []
      state.cardNumber = ''
    },
    resetCheckout: (state) => {
      state.isCheckoutComplete = false
    }
  }
})

export const {
  addToBasket,
  removeFromBasket,
  updateQuantity,
  removeAllItems,
  setCardNumber,
  completeCheckout,
  resetCheckout
} = basketSlice.actions

export const selectBasketItems = (state: RootState) => state.basket.items

export const selectBasketItemCount = (state: RootState) =>
  state.basket.items.reduce((total, item) => total + item.quantity, 0)

export const selectBasketTotal = (state: RootState, products: Basket.Product[]) =>
  state.basket.items.reduce((total, item) => {
    const product = products.find(p => p.sku === item.sku)
    return total + (product?.price || 0) * item.quantity
  }, 0)

export const selectBasketItemQuantity = (state: RootState, sku: number) =>
  state.basket.items.find(item => item.sku === sku)?.quantity || 0

export const selectCardNumber = (state: RootState) => state.basket.cardNumber
export const selectIsCheckoutComplete = (state: RootState) => state.basket.isCheckoutComplete

export const basketReducer = basketSlice.reducer
