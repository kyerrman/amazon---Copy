export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  pricePence: 0
}, {
  id: '2',
  deliveryDays: 3,
  pricePence: 549
}, {
  id: '3',
  deliveryDays: 1,
  pricePence: 899
}]

export function deliveryOptionsHTML (matchingProduct, dayjs, cartItem) {
  let html = ''

  deliveryOptions.forEach((deliveryOption) => {
    // importing dayjs library for days calculations
    const today = dayjs()
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'day'
    )
    // making format 
    const dateString = deliveryDate.format('dddd, MMMM DD, YYYY')

    const priceString = deliveryOption.pricePence === 0
      ? 'FREE'
      : `£${(deliveryOption.pricePence / 100).toFixed(2)} -`

    // creating a condition for delivery options id
    // being exactly equal to the cart's delivery id
    let isRadioChecked = deliveryOption.id === cartItem.deliveryOptionId

    html += `
      <div class="delivery-option">
        <input 
          type="radio"
          ${isRadioChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    
    `

  })

  return html
}