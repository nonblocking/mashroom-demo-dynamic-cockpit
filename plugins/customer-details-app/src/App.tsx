
import React, {useState, useEffect} from 'react';

import type {Customer} from 'mock-backend/type-definitions';

import styles from './App.scss';

type Props = {
    customerId: string;
    backendApiBasePath: string;
}

export default ({customerId, backendApiBasePath}: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    useEffect(() => {
        fetch(`${backendApiBasePath}/customers/${customerId}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((cust) => {
                setLoading(false);
                setCustomer(cust);
            }).catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <div className={styles.App}>
            {customer && (
                <div>
                    Customer: {customer.firstName}
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
