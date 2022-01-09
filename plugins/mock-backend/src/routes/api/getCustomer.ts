
import {customers} from '../../test_data';

import type {Request, Response} from 'express';

export default async (req: Request, res: Response) => {
    const {customerId} = req.params;

    const customer = customers.find(({customerId: id}) => id === customerId);
    if (!customer) {
        res.sendStatus(404);
    }

    res.json(customer);
};
