
import React, {useState, useEffect} from 'react';

import styles from './App.scss';
import {Customer, Order} from "mock-backend/type-definitions";

type Props = {
    orderId: string;
    locale: string;
    backendApiBasePath: string;
}

export default ({orderId, locale, backendApiBasePath}: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    useEffect(() => {
        fetch(`${backendApiBasePath}/orders/${orderId}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((ord) => {
                setOrder(ord);
                return fetch(`${backendApiBasePath}/customers/${ord.customerId}`, {
                    credentials: 'include',
                })
                    .then(res => res.json())
                    .then((cust) => {
                        setLoading(false);
                        setCustomer(cust);
                    })

            }).catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    }, []);

    const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' });
    const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' });

    return (
        <div className={styles.App}>
            {order && customer && (
                <div className={styles.OrderDetails}>
                    <div className={styles.OrderDetailsHeader}>
                        <div>
                            <div className={styles.OrderId}>
                                Order: #{order.orderId}
                            </div>
                            <div>
                                {dateFormat.format(new Date(order.date))}
                            </div>
                            <div className={styles.OrderCustomer}>
                                {customer.prefix} {customer.firstName} {customer.lastName} {customer.suffix}
                            </div>
                        </div>
                        <div className={styles.OrderPrice}>
                            {numberFormat.format(order.totalPrice)}
                        </div>
                    </div>
                    <table className={styles.OrderPositions}>
                        <thead>
                        <tr>
                            <th>Order Pos</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            order.positions.map((pos) => (
                                <tr key={pos.orderPos}>
                                    <td>
                                        #{pos.orderPos}
                                    </td>
                                    <td>
                                        {pos.productId}
                                    </td>
                                    <td>
                                        {pos.productName}
                                    </td>
                                    <td>
                                        {numberFormat.format(pos.price)}
                                    </td>
                                    <td>
                                        {pos.quantity}
                                    </td>
                                    <td>
                                        {numberFormat.format(pos.price * pos.quantity)}
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
