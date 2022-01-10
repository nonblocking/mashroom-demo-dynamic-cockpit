
import {orders} from '../../test_data';

import type {Request, Response} from 'express';
import {SearchHitOrder} from '../../../type-definitions';

export default async (req: Request, res: Response) => {
    const {customerId} = req.params;

    const customerOrders = orders.filter(({customerId: id}) => id === customerId);
    const hits: Array<SearchHitOrder> = [];
    customerOrders.forEach(({orderId, customerId, date, totalPrice}) => {
        hits.push({
            type: 'Order',
            orderId,
            customerId,
            date,
            totalPrice,
        });
    });

    res.json(hits);
};
