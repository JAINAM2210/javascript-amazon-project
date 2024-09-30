import {loadProducts} from '../data/products.js';
import {renderOrderPage} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummmary.js';

Promise.all([
    new Promise((resolve) =>{
        loadProducts(()=>{
            resolve('pass values here for next promise');
        });
    }), new Promise((resolve) =>{
        loadProducts(()=>{
            resolve('hi');
        });
    })  
]).then((allValues)=>{ //incase of .all, allValues will be a array and store all the passed values from previous promises
    renderOrderPage();
    renderPaymentSummary();
    console.log(allValues);
});

/*
new Promise((resolve) =>{
    loadProducts(()=>{
        resolve();
    });
}).then(()=>{ 
    renderOrderPage();
    renderPaymentSummary();
    
});
*/

// loadProducts(() => {
   
// });
