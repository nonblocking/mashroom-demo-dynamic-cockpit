
import { Router } from 'express';
import bodyParser from 'body-parser';
import search from './search';

export default (): Router => {
    const router = Router();
    router.use(bodyParser.json());

    router.get('/search', search);

    return router;
};
