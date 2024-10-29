import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCardProps } from '../types/basket';

export default function ProductCard({ product, quantity, onAdd, onRemove, viewMode }: ProductCardProps) {
    return (
        <div
            className={`
            ${viewMode === 'grid' ? 'h-full' : 'flex gap-4'}
        `}
        >
            <Card
                className={`
                bg-card border-border/50 shadow-lg hover:border-border/80 transition-all duration-300
                ${viewMode === 'grid' ? 'h-full' : 'flex-1'}
            `}
            >
                <CardHeader>
                    <CardTitle className="text-foreground flex justify-between items-center">
                        <span>{product.name}</span>
                        <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{product.description}</p>
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-bold text-foreground">
                            €{product.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Limit: {product.basketLimit}
                        </p>
                    </div>
                    {quantity > 0 && (
                        <p className="text-sm text-muted-foreground mt-2">In basket: {quantity}</p>
                    )}
                    {quantity >= product.basketLimit && (
                        <p className="text-sm text-destructive mt-1">Basket limit reached</p>
                    )}
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button
                        onClick={() => onAdd(product.sku)}
                        disabled={quantity >= product.basketLimit}
                        className="flex-1 bg-foreground text-background hover:bg-foreground/90 transition-colors"
                    >
                        Add
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => onRemove(product.sku)}
                        disabled={quantity === 0}
                        className="flex-1 border-foreground/20 hover:bg-foreground/10"
                    >
                        Remove
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
