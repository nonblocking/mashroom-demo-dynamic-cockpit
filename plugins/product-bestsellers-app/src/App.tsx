
import React, {useState, useEffect} from 'react';

import styles from './App.scss';
import {Bestsellers} from "mock-backend/type-definitions";

type Props = {
    backendApiBasePath: string;
}

export default ({backendApiBasePath}: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [bestsellers, setBestsellers] = useState<Bestsellers | null>(null);
    useEffect(() => {
        fetch(`${backendApiBasePath}/products/bestsellers`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((bs) => {
                setLoading(false);
                setBestsellers(bs);
            }).catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <div className={styles.App}>
            {bestsellers && (
                <>
                    <div className={styles.BestsellersHeader}>
                        Best Sellers
                    </div>
                    <div className={styles.Bestsellers}>
                        <div className={styles.FiveProducts}>
                            {
                                bestsellers.slice(0, 5).map((bs) => (
                                    <div key={String(bs.rank)} className={styles.Bestseller}>
                                        <div>#{bs.rank}</div>
                                        <div>{bs.productName}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.FiveProducts}>
                            {
                                bestsellers.slice(5).map((bs) => (
                                    <div key={String(bs.rank)} className={styles.Bestseller}>
                                        <div>#{bs.rank}</div>
                                        <div>{bs.productName}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>
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
