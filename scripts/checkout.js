import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderChecoutHeader } from "./checkout/checkoutHeader.js";
import '../data/cart-class.js'

renderChecoutHeader()
renderOrderSummary()

renderPaymentSummary()