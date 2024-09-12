export const cart = [];

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
  
}