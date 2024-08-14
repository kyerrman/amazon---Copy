import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary () {
  let totalPricePence = 0
  let totalShippingPricePence = 0
  let totalQuantity = 0

  // looping through cart and summing all prices
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId)

    totalPricePence += product.pricePence * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem)

    totalShippingPricePence += deliveryOption.pricePence

    totalQuantity += cartItem.quantity
  })
  
  const totalPaymentBeforeTax = totalPricePence + totalShippingPricePence
  const taxPence = totalPaymentBeforeTax * 0.15

  const totalPayment = totalPaymentBeforeTax + taxPence

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">£${(totalPricePence / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        £${(totalShippingPricePence / 100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        £${(totalPaymentBeforeTax / 100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (15%):</div>
      <div class="payment-summary-money">
        £${(taxPence / 100).toFixed(2)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        £${(totalPayment / 100).toFixed(2)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>

  `

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML
} 