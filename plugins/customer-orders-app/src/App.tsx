
import React, {useEffect, useState} from 'react';

import styles from './App.scss';
import {SearchHitOrder} from "mock-backend/type-definitions";

type Props = {
    customerId: string;
    backendApiBasePath: string;
}

export default ({customerId, backendApiBasePath}: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState<Array<SearchHitOrder> | null>(null);
    useEffect(() => {
        fetch(`${backendApiBasePath}/customers/${customerId}/orders`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((ord) => {
                setLoading(false);
                setOrders(ord);
            }).catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <div className={styles.App}>
            {orders && (
                <div>
                    Orders: {orders.length}
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
