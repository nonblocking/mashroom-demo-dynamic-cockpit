
import {products} from '../../test_data';

import type {Request, Response} from 'express';

export default async (req: Request, res: Response) => {
    const {productId} = req.params;

    const product = products.find(({productId: id}) => id === productId);
    if (!product) {
        res.sendStatus(404);
    }

    res.json(product);
};
