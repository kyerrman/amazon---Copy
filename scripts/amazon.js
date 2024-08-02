
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

      <div class="added-to-cart">
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

// making add to cart buttons interactive
document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // selecting product id from html
      let productId = button.dataset.productId
      
      // creat a variable to check if item is already in cart when it is being added to cart
      let isAlreadyInCart;

      // loop through cart, check if item being added exists
      cart.forEach((item) => {
        if (productId === item.productId) {
          isAlreadyInCart = item
        }
      })


      // calling the quantity selector
      let quantitySelector = document.querySelector(`.selector-${productId}`)

      // if item already exists in cart, update quantity only. Else, add new item to cart
      if (isAlreadyInCart) {
        isAlreadyInCart.quantity += Number(quantitySelector.value)
      } else {
        cart.push({
          productId,
          quantity: Number(quantitySelector.value)
        })
      }

      // adding cart quantity and displaying on page
      let cartQuantity = 0

      cart.forEach((item) => {
        cartQuantity += item.quantity
      })
      
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity
    })
  })
  