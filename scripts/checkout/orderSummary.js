import {calcCartQuantity, cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js'

export function renderOrderPage() {
    let cartSummaryHTML='';
    cart.forEach((cartItem) =>{

        const productid=cartItem.productId;

        let match;

        products.forEach((product) => {

            if(product.id=== productid)
                match=product;
        });

        const deliveryOptionId= cartItem.deliveryOptId;
        let deliveryOption;
        deliveryOptions.forEach((option) => {

            if(option.id===deliveryOptionId)
                deliveryOption=option;

        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days'); 
        const dateString = deliveryDate.format('dddd, MMMM D');


        cartSummaryHTML+= `
        <div class="cart-item-container js-cart-item-container-${match.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${match.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${match.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(match.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${match.id}">
                    Update
                    <input class="quantity-input">
                    <span class="save-quantity-link link-primary">
                    Save
                    </span>
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${match.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(match,cartItem)}
                
                </div>
            </div>
            </div>`;
    });


    function deliveryOptionsHTML(match,cartItem){
        let deliveryOptHTML='';

        deliveryOptions.forEach((option) => {

            const today = dayjs();
            const deliveryDate = today.add(option.deliveryDays, 'days'); 
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = option.priceCents===0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;
            
            const isChecked = option.id===cartItem.deliveryOptId;

            deliveryOptHTML+= ` <div class="delivery-option js-delivery-option"
                                data-product-id="${match.id}"
                                data-delivery-option-id="${option.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''} 
                    class="delivery-option-input" name="delivery-option-${match.id}">
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
        });

        return deliveryOptHTML;
    }
    document.querySelector('.js-order-summary')
    .innerHTML= cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
        link.addEventListener('click', () =>{
        const productid= link.dataset.productId;

        removeFromCart(productid);

        const container = document.querySelector(`.js-cart-item-container-${productid}`);
        
        container.remove();

        updateCartQuan();
        });
    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
        element.addEventListener('click', () =>{
            const {productId, deliveryOptionId}=element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderPage();
        });

    });

    //Different Code

    document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
        link.addEventListener('click', () =>{
        const productid= link.dataset.productId;

        console.log(productid);
        });
    });

    function updateCartQuan() {
    
        const cartQuantity= calcCartQuantity();

        if(cartQuantity===0)
            document.querySelector('.js-return-to-home-link').innerHTML =``;
        else if(cartQuantity===1)
            document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} item`;
        else
            document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;

    }

    updateCartQuan();
}