
import {customers, products} from '../../test_data';

import type {Request, Response} from 'express';
import type {SearchHits, SearchResult} from "../../../type-definitions";

export default async (req: Request, res: Response) => {
    const {q, skip: skipParam, limit: limitParam} = req.query as {q: string | undefined, skip: string | undefined, limit: string | undefined};

    const hits: SearchHits = [];
    let total = 0;

    if (q && q.length > 2) {
        const skip = skipParam ? parseInt(skipParam) : 0;
        const limit = limitParam ? parseInt(limitParam) : 100;
        const searchTerms = q.toLowerCase().split(' ');
        customers.forEach(({customerId, firstName, lastName, birthDate, suffix, prefix, address: {city, zipCode, streetAddress}, contact: {email1}}) => {
            if ([firstName, lastName, city, streetAddress, email1].some((prop) => searchTerms.some((t) => prop.toLowerCase().indexOf(t) !== -1))) {
                total ++;
                if (total >= skip && hits.length < limit) {
                    hits.push({
                        type: "Customer",
                        customerId,
                        firstName,
                        lastName,
                        birthDate,
                        suffix,
                        prefix,
                        city,
                        zipCode,
                        streetAddress,
                    });
                }
            }
        });
        products.forEach(({productId, name, description, color, material}) => {
            if ([name, description, color, material].some((prop) => searchTerms.some((t) => prop.toLowerCase().indexOf(t) !== -1))) {
                total ++;
                if (total >= skip && hits.length < limit) {
                    hits.push({
                        type: "Product",
                        productId,
                        name,
                        color,
                        material,
                    });
                }
            }
        });
    }

    const result: SearchResult = {
        hits,
        total,
    }

    res.json(result);
};
