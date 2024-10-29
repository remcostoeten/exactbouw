declare namespace Basket {
    interface Product {
        readonly sku: number;
        readonly name: string;
        readonly description: string;
        readonly price: number;
        readonly basketLimit: number;
    }

    interface BasketItem {
        readonly sku: number;
        quantity: number;
    }

    interface BasketState {
        readonly items: BasketItem[];
        readonly cardNumber: string;
        readonly isCheckoutComplete: boolean;
    }

    interface BasketHeaderProps {
        itemCount: number;
        totalCost: number;
    }

    interface ProductCardProps {
        product: Product;
        quantity: number;
        onAdd: (sku: number) => void;
        onRemove: (sku: number) => void;
    }

    interface CheckoutItemProps {
        product: Product;
        quantity: number;
        onQuantityChange: (sku: number, quantity: number) => void;
        onRemoveAll: (sku: number) => void;
    }

    interface CheckoutFormProps {
        cardNumber: string;
        onCardNumberChange: (value: string) => void;
        onSubmit: () => void;
        isValid: boolean;
        isDisabled: boolean;
    }
}

export = Basket;
export as namespace Basket;
