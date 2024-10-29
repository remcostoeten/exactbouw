import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { useBasket } from '../hooks/use-basket';
import { getProducts } from '../services/product-service';
import ProductCard from './product-card';
import ViewToggle from './view-toggle';

type ViewMode = 'grid' | 'list';

export default function ProductList() {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [, navigate] = useLocation();
    const { itemCount, totalCost, getItemQuantity, addItem, removeItem } = useBasket();
    const products = getProducts();

    const handleAddItem = (sku: number) => {
        addItem(sku);
        toast.success('Item added to cart', {
            description: 'Your item has been added to the cart successfully.',
        });
    };

    const handleRemoveItem = (sku: number) => {
        removeItem(sku);
        toast.error('Item removed from cart', {
            description: 'Your item has been removed from the cart.',
        });
    };

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-6 p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                <h1 className="text-2xl font-bold text-foreground">Products</h1>
                <div className="flex items-center gap-4">
                    <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/checkout')}
                        className="text-foreground hover:bg-foreground/10"
                    >
                        Items: {itemCount}
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/checkout')}
                        className="text-foreground hover:bg-foreground/10"
                    >
                        Total: €{totalCost.toFixed(2)}
                    </Button>
                </div>
            </header>

            <div
                className={`
        ${
            viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
        }
      `}
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.sku}
                        product={product}
                        quantity={getItemQuantity(product.sku)}
                        onAdd={handleAddItem}
                        onRemove={handleRemoveItem}
                        viewMode={viewMode}
                    />
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <Button
                    onClick={() => navigate('/checkout')}
                    disabled={itemCount === 0}
                    className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                >
                    <ShoppingCart className="h-5 w-5" />
                    Checkout ({itemCount} items)
                </Button>
            </div>
        </div>
    );
}
