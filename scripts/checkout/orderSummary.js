import { cart, removeFromCart, updateQuantitty, UpdateDeliveryOptions } from "../../data/cart.js";
import { getProduct} from "../../data/products.js";
import { deliveryOptionsHTML, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderChecoutHeader } from "./checkoutHeader.js";

// creating a function which contains all the code,
// and re-running it to update the page
export function renderOrderSummary () {

  let checkoutHTML = ''

  

  // loop through cart and generate html
  cart.forEach((cartItem) => {
    const productId = cartItem.productId

    let matchingProduct = getProduct(productId);

    let deliveryOption = getDeliveryOption(cartItem);
    const dateString = calculateDeliveryDate(deliveryOption)

    let htmlGeneration = `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date js-delivery-date-${matchingProduct.id}">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              £${(matchingProduct.pricePence / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link"
              data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class="save-quantity-link link-primary
              js-save-quantity-link"
              data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    
    `

    checkoutHTML += htmlGeneration
  })


  document.querySelector('.js-order-summary')
    .innerHTML = checkoutHTML
    
    
  // Event listener for all delete links on checkout page 
  document.querySelectorAll(`.js-delete-quantity-link`)
    .forEach((deleteLink) => {
      deleteLink.addEventListener('click', () => {

        const productId = deleteLink.dataset.productId
        
        removeFromCart(productId)
        renderOrderSummary()
        renderPaymentSummary()
        renderChecoutHeader()
      })
    })


  

  // adding class to activate input for updating cart quantity
  document.querySelectorAll('.js-update-quantity-link')
    .forEach((updateLink) => {
      updateLink.addEventListener('click', () => {
        const productId = updateLink.dataset.productId
        const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`)

        cartContainer.classList.add('is-editing-quantity')
        
      })
    })


  document.querySelectorAll('.js-save-quantity-link')
    .forEach((saveLink) => {
      saveLink.addEventListener('click', () => {
        // call all elements needed
        const productId = saveLink.dataset.productId
        const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`)

        const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)

        // collecting value of newly input quantity
        const newQuantity = Number(quantityInput.value)
        
        // updating quantity to newly input quantity
        updateQuantitty(productId, newQuantity, quantityLabel)

        // remove 'is-editing-quantity' class after editing quantity
        cartContainer.classList.remove('is-editing-quantity')

        renderPaymentSummary()
        
        renderChecoutHeader()
      })
    })


  // event listener for delivery options
  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const {productId, deliveryOptionId} = option.dataset
        
        UpdateDeliveryOptions(productId, deliveryOptionId)

        // re-run whole code anytime we click on delivery option
        renderOrderSummary()

        renderPaymentSummary()
        
      })
    })
}
