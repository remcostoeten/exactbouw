import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ROUTES } from '@/router/routes'
import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useCheckout } from '../hooks/use-checkout'
import { CheckoutForm } from './checkout-form'
import { CheckoutItem } from './checkout-item'

export default function Checkout() {
  const [, navigate] = useLocation()
  const {
    items,
    itemCount,
    totalCost,
    cardNumber,
    isCheckoutComplete,
    isCardValid,
    updateQuantity,
    removeAll,
    setCardNumber,
    completeCheckout,
    resetCheckout
  } = useCheckout()

  useEffect(() => {
    if (itemCount === 0 && !isCheckoutComplete) {
      navigate(ROUTES.HOME)
    }
  }, [itemCount, isCheckoutComplete, navigate])

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Checkout ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
        <Button
          variant="secondary"
          onClick={() => navigate(ROUTES.HOME)}
          aria-label="Return to shopping"
        >
          Continue Shopping
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr,400px]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">Your basket is empty</p>
          ) : (
            <>
              {items.map((item) => (
                <CheckoutItem
                  key={item.sku}
                  product={item}
                  quantity={item.quantity}
                  onQuantityChange={updateQuantity}
                  onRemoveAll={removeAll}
                />
              ))}

              <div className="pt-4 text-right">
                <p className="text-2xl font-bold">
                  Total: €{totalCost.toFixed(2)}
                </p>
              </div>
            </>
          )}
        </div>

        <div>
          <CheckoutForm
            cardNumber={cardNumber}
            onCardNumberChange={setCardNumber}
            onSubmit={completeCheckout}
            isValid={isCardValid}
            isDisabled={itemCount === 0}
          />
        </div>
      </div>

      <Dialog
        open={isCheckoutComplete}
        onOpenChange={(open) => {
          if (!open) {
            resetCheckout()
            navigate(ROUTES.HOME)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanks for your order!</DialogTitle>
          </DialogHeader>
          <Button
            onClick={() => navigate(ROUTES.HOME)}
            variant="secondary"
          >
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
