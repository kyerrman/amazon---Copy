
export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 3
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 5
}]

// function for cart addition
export function addToCart (productId, quantitySelector) {

  // creat a variable to check if item is already in cart when it is being added to cart
  let isAlreadyInCart;

  // loop through cart, check if item being added exists
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      isAlreadyInCart = cartItem
    }
  })

  // if item already exists in cart, update quantity only. Else, add new item to cart
  if (isAlreadyInCart) {
    isAlreadyInCart.quantity += Number(quantitySelector.value)
  } else {
    cart.push({
      productId,
      quantity: Number(quantitySelector.value)
    })
  }

  saveToStorage()
}

// function for removing cart from page
export function removeFromCart (productId, cartContainer) {

  let updatedCart = []

  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      updatedCart.push(cartItem)
    }
  })

  cart = updatedCart
  cartContainer.remove()

  saveToStorage()
}

function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function updateQuantitty (productId, newQuantity, cartContainer) {
  let matchingCart;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingCart = cartItem
    }
  })

  if (newQuantity <= 0 || newQuantity > 10) {
    alert('Quantity for the item should be at least 1 and not more than 10')
    return;
  }

  matchingCart.quantity = newQuantity

  saveToStorage()
}