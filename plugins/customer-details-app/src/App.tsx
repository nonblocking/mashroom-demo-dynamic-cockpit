
import React, {useState, useEffect} from 'react';

import type {MashroomPortalMessageBus} from "@mashroom/mashroom-portal/type-definitions";
import type {Customer} from 'mock-backend/type-definitions';

import styles from './App.scss';

type Props = {
    customerId: string;
    backendApiBasePath: string;
    messageBus: MashroomPortalMessageBus;
}

const openOrders = (customerId: string, messageBus: MashroomPortalMessageBus) => {
    messageBus.publish('DEMO_COCKPIT_OPEN_APP', {
        name: 'Mashroom Dynamic Cockpit Demo Customer Orders App',
        config: {
            customerId,
        }
    });
}

export default ({customerId, messageBus, backendApiBasePath}: Props) => {
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
                <div className={styles.Customer}>
                    <div className={styles.CustomerName}>
                        Customer: {customer.prefix} {customer.firstName} {customer.lastName} {customer.suffix}
                    </div>
                    <div className={styles.CustomerBirthDate}>
                        Birth date: {customer.birthDate.substring(0, 10)}
                    </div>
                    <div className={styles.Details}>
                        <div className={styles.CustomerAddress}>
                            <div className={styles.DetailsHeader}>Address</div>
                            <div>{customer.address.streetAddress}</div>
                            <div>{customer.address.zipCode} {customer.address.city}</div>
                        </div>
                        <div className={styles.CustomerContact}>
                            <div className={styles.DetailsHeader}>Contact</div>
                            <div><span>Mobile 1:</span> {customer.contact.mobile1}</div>
                            <div><span>Email 1:</span> {customer.contact.email1}</div>
                        </div>
                    </div>
                    <div className={styles.Actions}>
                        <button className={styles.OpenAppButton} onClick={() => openOrders(customerId, messageBus)}>
                            <span>Show Orders</span>
                        </button>
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
