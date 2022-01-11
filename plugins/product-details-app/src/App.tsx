
import React, {useEffect, useState} from 'react';

import styles from './App.scss';
import {Product} from "mock-backend/type-definitions";

type Props = {
    productId: string;
    locale: string;
    backendApiBasePath: string;
}

export default ({productId, locale, backendApiBasePath}: Props) => {
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

    const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });

    return (
        <div className={styles.App}>
            {product && (
                <div className={styles.Product}>
                    <div className={styles.DetailsText}>
                        <div className={styles.ProductName}>
                            {product.name}
                        </div>
                        <div>
                            {product.description}
                        </div>
                        <div>
                            <span>Color</span> {product.color}
                        </div>
                        <div>
                            <span>Material</span> {product.material}
                        </div>
                        <div>
                            <span>Price</span>
                            <div className={styles.ProductPrice}>
                                {numberFormat.format(product.price)}
                            </div>
                        </div>
                    </div>
                    <div className={styles.DetailsImage}>
                        <img width={640} height={480} src={product.imageUrl} alt={product.name}/>
                    </div>
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
