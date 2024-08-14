import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

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

export function deliveryOptionsHTML (matchingProduct, cartItem) {
  let html = ''

  deliveryOptions.forEach((deliveryOption) => {
    const dateString = calculateDeliveryDate(deliveryOption)
    const priceString = deliveryOption.pricePence === 0
      ? 'FREE'
      : `£${(deliveryOption.pricePence / 100).toFixed(2)} -`

    // creating a condition for delivery options id
    // being exactly equal to the cart's delivery id
    let isRadioChecked = deliveryOption.id === cartItem.deliveryOptionId

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
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

// function for getting the whole delivery option
// via id
export function getDeliveryOption (cartItem) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === cartItem.deliveryOptionId) {
      deliveryOption = option
    }
  })

  return deliveryOption || deliveryOptions[0]
}

export function calculateDeliveryDate (deliveryOption) {
  // importing dayjs library for days calculations
  const today = dayjs()
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'day'
  )
  // making format 
  const dateString = deliveryDate.format('dddd, MMMM DD, YYYY')

  return dateString
}
