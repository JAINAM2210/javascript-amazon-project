export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calcCartQuantity(){
    let cartQuantity =0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
  
    });

    return cartQuantity;
}
export function addToCart(productid,qty) {

    let match;
    cart.forEach((item) =>{

        if(productid=== item.productId)
            match= item;
    });

    if(match){
        match.quantity+=qty;
    }
    else{
        cart.push({
            productId: productid,
            quantity: qty,
            deliveryOptId: '1'
        });
  }

  saveToStorage();
  
}

export function removeFromCart(productid){
    const newCart=[];

    cart.forEach((cartItem) =>{

        if (cartItem.productId !==productid){
            newCart.push(cartItem);
        }

    });

    cart=newCart;

    saveToStorage();
}

export function updateDeliveryOption(productid, deliveryOptionId){

    let match;
    cart.forEach((item) =>{

        if(productid=== item.productId)
            match= item;
    });

    match.deliveryOptId=deliveryOptionId;

    saveToStorage();
}

export function loadCart(fun){
    const xhr= new XMLHttpRequest();

    xhr.addEventListener('load',()=> {
        console.log(xhr.response);
        fun();
    });
    xhr.open('GET','https://supersimplebackend.dev/cart');
    xhr.send();
}