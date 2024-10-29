import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CheckoutForm({
  cardNumber,
  onCardNumberChange,
  onSubmit,
  isValid,
  isDisabled
}: Basket.CheckoutFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Credit Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '')
            if (value.length <= 16) {
              onCardNumberChange(value)
            }
          }}
          className={isValid ? 'border-green-500' : ''}
          placeholder="Enter 16 digit card number"
        />
        {cardNumber && !isValid && (
          <p className="text-sm text-destructive">
            Please enter a valid 16-digit card number
          </p>
        )}
      </div>
      <Button
        onClick={onSubmit}
        disabled={!isValid || isDisabled}
        className="w-full"
      >
        Complete Checkout
      </Button>
    </div>
  )
}
