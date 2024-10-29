import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function CheckoutItem({
  product,
  quantity,
  onQuantityChange,
  onRemoveAll
}: Basket.CheckoutItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">€{product.price.toFixed(2)} each</p>
      </div>
      <div className="flex items-center gap-4">
        <Select
          value={quantity.toString()}
          onValueChange={(value) => onQuantityChange(product.sku, parseInt(value))}
        >
          <SelectTrigger className="w-24">
            <SelectValue>{quantity}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: product.basketLimit }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-24 text-right">
          €{(product.price * quantity).toFixed(2)}
        </div>
        <Button
          variant="destructive"
          onClick={() => onRemoveAll(product.sku)}
        >
          Remove All
        </Button>
      </div>
    </div>
  )
}
