export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){

    localStorage.setItem('cart', JSON.stringify(cart));
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
            quantity: qty
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