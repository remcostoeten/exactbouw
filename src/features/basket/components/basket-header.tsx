import { Button } from '@/components/ui/button';
import { ROUTES } from '@/router/routes';
import { ShoppingCart } from 'lucide-react';
import { useLocation } from 'wouter';

interface BasketHeaderProps {
    itemCount: number;
    totalCost: number;
}

export function BasketHeader({ itemCount, totalCost }: BasketHeaderProps) {
    const [, navigate] = useLocation();

    const handleNavigateToCheckout = () => {
        navigate(ROUTES.CHECKOUT);
    };

    return (
        <header className="flex justify-between items-center mb-6 p-4 bg-background rounded-lg shadow">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    className="flex items-center gap-2"
                    onClick={handleNavigateToCheckout}
                >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-lg">Total items: {itemCount}</span>
                </Button>
                <Button
                    variant="ghost"
                    className="text-lg font-semibold"
                    onClick={handleNavigateToCheckout}
                >
                    Total cost: €{totalCost.toFixed(2)}
                </Button>
            </div>
        </header>
    );
}
