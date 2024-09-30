import {loadProducts} from '../data/products.js';
import {renderOrderPage} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummmary.js';

loadProducts(() => {
    renderOrderPage();
    renderPaymentSummary();
});
