
import {orders} from '../../test_data';

import type {Request, Response} from 'express';

export default async (req: Request, res: Response) => {
    const {orderId} = req.params;

    const order = orders.find(({orderId: id}) => id === orderId);
    if (!order) {
        res.sendStatus(404);
    }

    res.json(order);
};
