
import {resolve} from 'path';
import {readJsonSync} from 'fs-extra';

import type {Bestsellers, Customer, Order, Product} from "../type-definitions";

export const customers: Array<Customer> = readJsonSync(resolve(__dirname, '../data/customers.json'));
export const products: Array<Product> = readJsonSync(resolve(__dirname, '../data/products.json'));
export const orders: Array<Order> = readJsonSync(resolve(__dirname, '../data/orders.json'));
export const bestsellers: Bestsellers = readJsonSync(resolve(__dirname, '../data/bestsellers.json'));
