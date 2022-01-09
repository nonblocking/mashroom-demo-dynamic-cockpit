
import React, {useState, useEffect} from 'react';

import styles from './App.scss';
import {Customer, Order} from "mock-backend/type-definitions";

type Props = {
    orderId: string;
    backendApiBasePath: string;
}

export default ({orderId, backendApiBasePath}: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    useEffect(() => {
        fetch(`${backendApiBasePath}/orders/${orderId}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((ord) => {
                setLoading(false);
                setOrder(ord);
            }).catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <div className={styles.App}>
            {order && (
                <div>
                    Order: {order.totalPrice}
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
