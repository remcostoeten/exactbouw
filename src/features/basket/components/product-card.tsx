import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProductCardProps } from '../types/basket'

export function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-lg font-bold mt-2">€{product.price.toFixed(2)}</p>
        {quantity > 0 && (
          <p className="text-sm text-muted-foreground">In basket: {quantity}</p>
        )}
        {quantity >= product.basketLimit && (
          <p className="text-sm text-destructive">Basket limit reached</p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          onClick={() => onAdd(product.sku)}
          disabled={quantity >= product.basketLimit}
          className="flex-1"
        >
          Add
        </Button>
        <Button
          variant="destructive"
          onClick={() => onRemove(product.sku)}
          disabled={quantity === 0}
          className="flex-1"
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  )
}
