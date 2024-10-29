'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Product } from '../types/basket'

type ProductCardProps = {
    product: Product
    viewMode: 'grid' | 'list'
    quantity: number
    onAdd: (sku: number) => void
    onRemove: (sku: number) => void
}

export default function ProductCard({ product, viewMode, quantity, onAdd, onRemove }: ProductCardProps) {
    const [imageError, setImageError] = useState(false)
    const isMaxQuantity = quantity >= product.maxQty

    return (
        <div className={`
            rounded-lg border bg-card text-card-foreground shadow-sm
            ${viewMode === 'grid' ? 'p-4' : 'p-4 flex gap-4'}
        `}>
            <div className={`
                ${viewMode === 'grid' ? 'aspect-square mb-4' : 'aspect-square w-48 flex-shrink-0'}
                relative overflow-hidden rounded-md bg-muted
            `}>
                <img
                    src={imageError ? `https://via.placeholder.com/400x400?text=${product.name}` : product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                    onError={() => setImageError(true)}
                    loading="lazy"
                />
            </div>

            <div className={`${viewMode === 'list' && 'flex-1 flex flex-col justify-between'}`}>
                <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                    <p className="mt-2 font-medium">${product.price.toFixed(2)}</p>
                </div>

                <div className={`
                    ${viewMode === 'grid' ? 'mt-4' : 'mt-2'}
                    flex items-center gap-2
                `}>
                    {quantity > 0 ? (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onRemove(product.sku)}
                            >
                                -
                            </Button>
                            <span className="min-w-[2rem] text-center">{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onAdd(product.sku)}
                                disabled={isMaxQuantity}
                            >
                                +
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => onAdd(product.sku)}
                        >
                            Add to Cart
                        </Button>
                    )}
                    <span className="text-sm text-muted-foreground">
                        {product.stock} in stock (max {product.maxQty} per order)
                    </span>
                </div>
            </div>
        </div>
    )
}
