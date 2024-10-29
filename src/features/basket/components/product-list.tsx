'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useState } from 'react'
import { useLocation } from 'wouter'
import { useBasket } from '../hooks/use-basket'
import { getProducts } from '../services/product-service'
import ProductCard from './product-card'
import ViewToggle from './view-toggle'

type ViewMode = 'grid' | 'list'

export default function ProductList() {
  const [, navigate] = useLocation()
  const { itemCount, totalCost, getItemQuantity, addItem, removeItem } = useBasket()
  const products = getProducts()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  return (
    <div className="container mx-auto p-4">
      {/* Simple header */}
      <header className="flex justify-between items-center mb-6 p-4 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold">Products</h1>
        <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
      </header>

      {/* Product grid */}
      <div className={`
        ${viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
        }
      `}>
        {products.map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            quantity={getItemQuantity(product.sku)}
            onAdd={addItem}
            onRemove={removeItem}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Checkout button */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => navigate('/checkout')}
          disabled={itemCount === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Checkout ({itemCount} items)
        </Button>
      </div>
    </div>
  )
}
