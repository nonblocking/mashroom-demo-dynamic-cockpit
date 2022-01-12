
import React, {useEffect, useState} from 'react';

import type {SearchHitOrder, Customer} from "mock-backend/type-definitions";
import type {MashroomPortalMessageBus} from "@mashroom/mashroom-portal/type-definitions";

import styles from './App.scss';

type Props = {
    locale: string;
    customerId: string;
    messageBus: MashroomPortalMessageBus;
    backendApiBasePath: string;
}

const openOrderDetails = (orderId: string, messageBus: MashroomPortalMessageBus) => {
    messageBus.publish('DEMO_COCKPIT_OPEN_APP', {
       name: 'Mashroom Dynamic Cockpit Demo Order Details App',
       config: {
           orderId,
       }
    });
}

export default ({customerId, locale, messageBus, backendApiBasePath}: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState<Array<SearchHitOrder> | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });
    const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });

    useEffect(() => {
        Promise.all([
            fetch(`${backendApiBasePath}/customers/${customerId}`, {
                credentials: 'include',
            })
                .then(res => res.json())
                .then((cus) => {
                    setCustomer(cus);
                }),
            fetch(`${backendApiBasePath}/customers/${customerId}/orders`, {
                credentials: 'include',
            })
                .then(res => res.json())
                .then((ord) => {
                    setOrders(ord);
                })
        ]).then(() => {
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    }, []);

    return (
        <div className={styles.App}>
            {orders && customer && (
                <div className={styles.Orders}>
                    <div className={styles.OrdersHeader}>
                        Orders of {customer.prefix} {customer.firstName} {customer.lastName} {customer.suffix}
                    </div>
                    <table className={styles.OrderList}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Date</th>
                                <th className={styles.PriceCol}>Price Total</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>
                                        #{order.orderId}
                                    </td>
                                    <td>
                                        {dateFormat.format(new Date(order.date))}
                                    </td>
                                    <td className={styles.PriceCol}>
                                        {numberFormat.format(order.totalPrice)}
                                    </td>
                                    <td>
                                        <button className={styles.OpenAppButton} onClick={() => openOrderDetails(order.orderId, messageBus)} >
                                            <span>Show Order Details</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
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
