import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useLocation } from 'wouter'
import { useBasket } from '../hooks/use-basket'
import { getProducts } from '../services/product-service'
import { ProductCard } from './product-card'

export default function ProductList() {
  const [, navigate] = useLocation()
  const { itemCount, totalCost, getItemQuantity, addItem, removeItem } = useBasket()
  const products = getProducts()

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 p-4 bg-card rounded-lg shadow">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/checkout')}
          >
            Items: {itemCount}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/checkout')}
          >
            Total: €{totalCost.toFixed(2)}
          </Button>
        </div>
      </header>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.sku}
            product={product}
            quantity={getItemQuantity(product.sku)}
            onAdd={addItem}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Checkout Button */}
      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => navigate('/checkout')}
          disabled={itemCount === 0}
          className="gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Checkout ({itemCount} items)
        </Button>
      </div>
    </div>
  )
}
