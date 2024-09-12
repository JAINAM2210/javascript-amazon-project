export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productid) {

    let match;
    cart.forEach((item) =>{

        if(productid=== item.productId)
            match= item;
    });

    if(match){
        match.quantity+=1;
    }
    else{
        cart.push({
            productId: productid,
            quantity: 1
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