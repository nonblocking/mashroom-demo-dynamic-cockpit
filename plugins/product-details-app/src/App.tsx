
import React, {useEffect, useState} from 'react';

import styles from './App.scss';
import {Product} from "mock-backend/type-definitions";

type Props = {
    productId: string;
    backendApiBasePath: string;
}

export default ({productId, backendApiBasePath}: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    useEffect(() => {
        fetch(`${backendApiBasePath}/products/${productId}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((pr) => {
                setLoading(false);
                setProduct(pr);
            }).catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <div className={styles.App}>
            {product && (
                <div>
                    Product: {product.name}
                </div>
            )}
            {loading && (
                <div className="mashroom-portal-app-loading">
                    <span />
                </div>
            )}
            {error && (
                <div className="mashroom-portal-app-loading-error ">
                    Error loading data
                </div>
            )}
        </div>
    );
}
