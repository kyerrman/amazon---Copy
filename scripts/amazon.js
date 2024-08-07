import { cart, addToCart } from "../data/cart.js"
import { products } from "../data/products.js"

// creating a variable to store all products on html
let productsHTML = ''


// loop throuh all products and generate an HTML for each product
products.forEach((product) => {
  let html= `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        £${(product.pricePence / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  
  `

  // add each product to the products on the HTML 
  productsHTML += html
})

// display products on webpage
document.querySelector('.js-products-grid')
  .innerHTML = productsHTML


function updateCartQuantity() {
  // adding cart quantity and displaying on page
  let cartQuantity = 0
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  })
  
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity

}


// making add to cart buttons interactive
document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    // setting a timeout ID for 'Added' message 
    let timeoutId;

    button.addEventListener('click', () => {
      // selecting product id from html
      const productId = button.dataset.productId

      // calling the quantity selector
      const quantitySelector = document.querySelector(`.selector-${productId}`)

      
      addToCart(productId, quantitySelector)

      updateCartQuantity()
      
      confirmedAddedToCartMessage(timeoutId, productId)
      
    })
  })
  
function confirmedAddedToCartMessage (timeoutId, productId) {

  // clearing timeout ID before re-running timeout
  clearTimeout(timeoutId)

  // making 'Added' message appear
  let addedCart = document.querySelector(`.js-added-to-cart-${productId}`)
  addedCart.classList.add('added-to-cart-visible')

  // setting timeout for 'Added' message to disappear
  timeoutId = setTimeout(() => {
    addedCart.classList.remove('added-to-cart-visible')
  }, 2000)
}