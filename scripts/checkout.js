import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";

let checkoutHTML = ''

// call function to update checkout
updateTotalCheckoutItems()


// loop through cart and generate html
cart.forEach((cartItem) => {
  let productId = cartItem.productId

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product
    }
  })

  
  let htmlGeneration = `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
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
            <span class="update-quantity-link link-primary">
              Update
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                £4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                £9.99 - Shipping
              </div>
            </div>
          </div>
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
      
      const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`)
      
      removeFromCart(productId, cartContainer)

      updateTotalCheckoutItems()
    })
  })


// create fucntion to update checkout
function updateTotalCheckoutItems () {
  let totalCartQuantityPage = document.querySelector('.js-total-cart-quantity')

  let totalItems = 0

  cart.forEach((cartItem) => {
    totalItems += cartItem.quantity
  })

  totalItems === 1 
    ? totalCartQuantityPage.innerHTML = `${totalItems} item`
  : totalCartQuantityPage.innerHTML = `${totalItems} items`


}
