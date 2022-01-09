
import { Router } from 'express';
import bodyParser from 'body-parser';
import search from './search';
import getCustomer from './getCustomer';
import getCustomerOrders from './getCustomerOrders';
import getProduct from './getProduct';
import getBestsellers from './getBestsellers';
import getOrder from './getOrder';

export default (): Router => {
    const router = Router();
    router.use(bodyParser.json());

    router.get('/search', search);
    router.get('/customers/:customerId', getCustomer);
    router.get('/customers/:customerId/orders', getCustomerOrders);
    router.get('/products/bestsellers', getBestsellers);
    router.get('/products/:productId', getProduct);
    router.get('/orders/:orderId', getOrder);

    return router;
};
