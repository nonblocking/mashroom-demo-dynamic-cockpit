
import {bestsellers} from '../../test_data';

import type {Request, Response} from 'express';

export default async (req: Request, res: Response) => {
    res.json(bestsellers);
};
