import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import {formatCurrency } from '../utils/money.js';

export function renderPaymentSummary(){
  
    let totalProductCost=0,shippingCost=0,totalQuantity=0;
    cart.forEach((cartItem) =>{

        const product= getProduct(cartItem.productId);
        totalProductCost+= product.priceCents * cartItem.quantity;
        totalQuantity+=cartItem.quantity;

        const deliveryOption= getDeliveryOption(cartItem.deliveryOptId);
        shippingCost+=deliveryOption.priceCents;

        console.log(shippingCost);
        
        
    });

    const totalBeforeTax= shippingCost + totalProductCost;
    const totalTax= totalBeforeTax * 0.1;
    const totalCost = totalBeforeTax + totalTax;

    const paymentSummmaryHTML=`
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalProductCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

    document.querySelector('.js-payment-summary')
    .innerHTML= paymentSummmaryHTML;

}

