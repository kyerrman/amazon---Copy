import {addToCart, cart, loadFromLocalStorage} from '../../data/cart.js'

describe('test suite: addToCart', () => {
  it('adds new produt to cart', () => {
    spyOn(localStorage, 'setItem').and.callFake(() => {
      return JSON.stringify([])
    })

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    })
    
    loadFromLocalStorage()
    addToCart('dib3dn9-dj30394-3i43i-9efnef', '1')
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
  })
})