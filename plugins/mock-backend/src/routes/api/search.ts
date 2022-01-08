
import type {Request, Response} from 'express';

export default async (req: Request, res: Response) => {
    const q = req.query.q as string;


    res.sendStatus(501);
};
