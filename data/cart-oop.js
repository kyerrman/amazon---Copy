function Cart (storageName) {
  const cart = {
    cartItems: undefined,
  
    loadFromLocalStorage () {
      this.cartItems = JSON.parse(localStorage.getItem(storageName)) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3,
        deliveryOptionId: '3'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 5,
        deliveryOptionId: '2'
      }]
    },
  
    saveToStorage () {
      localStorage.setItem(storageName, JSON.stringify(this.cartItems))
    },
  
      // function for cart addition
    addToCart (productId, quantitySelector) {
  
      // creat a variable to check if item is already in cart when it is being added to cart
      let isAlreadyInCart;
  
      // loop through cart, check if item being added exists
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          isAlreadyInCart = cartItem
        }
      })
  
      // if item already exists in cart, update quantity only. Else, add new item to cart
      if (isAlreadyInCart) {
        isAlreadyInCart.quantity += Number(quantitySelector.value)
      } else {
        this.cartItems.push({
          productId,
          quantity: Number(quantitySelector.value),
          deliveryOptionId: '1'
        })
      }
  
      this.saveToStorage()
    },
  
    // function for removing cart from page
    removeFromCart (productId) {
  
      let updatedCart = []
  
      this.cartItems.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
          updatedCart.push(cartItem)
        }
      })
  
      this.cartItems = updatedCart
  
      this.saveToStorage()
    },
  
    updateQuantitty (productId, newQuantity) {
      let matchingCart;
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingCart = cartItem
        }
      })
    
      if (newQuantity <= 0 || newQuantity > 10) {
        alert('Quantity for the item should be at least 1 and not more than 10')
        return;
      } else {
        matchingCart.quantity = newQuantity
      }
    
      this.saveToStorage()
    },
  
    UpdateDeliveryOptions (productId, deliveryOptionId) {
      let matchingCart;
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingCart = cartItem
        }
      })
    
      matchingCart.deliveryOptionId = deliveryOptionId
    
      this.saveToStorage()
    }
  }

  return cart
}

const cart = Cart('cart-oop')
const businessCart = Cart('cart-business')

cart.loadFromLocalStorage()
businessCart.loadFromLocalStorage()

businessCart.addToCart('dib3dn9-dj30394-3i43i-9efnef', 3)

console.log(cart)
console.log(businessCart)

