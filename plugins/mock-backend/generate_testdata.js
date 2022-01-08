
const {resolve} = require('path');
const {writeFileSync} = require('fs');
const faker = require('faker');

const NUM_CUSTOMERS = 1000
const NUM_PRODUCTS = 100
const MAX_ORDERS_PER_CUSTOMER = 5
const MAX_POS_PER_ORDER = 5

const customers = [];
const products = [];
const orders = [];

function main() {
    for (let i = 0; i < NUM_CUSTOMERS; i++) {
        customers.push(createCustomer(String(i + 1)));
    }
    for (let i = 0; i < NUM_PRODUCTS; i++) {
        products.push(createProduct(String(i + 1)));
    }
    for (let customer of customers) {
        const numOrders = Math.trunc(Math.random() * MAX_ORDERS_PER_CUSTOMER + 1);
        for (let i = 0; i < numOrders; i++) {
            orders.push(createOrder(String(i + 1), customer.customerId, products));
        }
    }

    writeFileSync(resolve(__dirname, './data/customers.json'), JSON.stringify(customers, null, 2));
    writeFileSync(resolve(__dirname, './data/products.json'), JSON.stringify(products, null, 2));
    writeFileSync(resolve(__dirname, './data/orders.json'), JSON.stringify(orders, null, 2));
}

function createCustomer(customerId) {
    return {
        customerId,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        prefix: faker.name.prefix(),
        suffix: faker.name.suffix(),
        address: {
            city: faker.address.city(),
            zipCode: faker.address.zipCode(),
            streetAddress: faker.address.streetAddress(),
        },
        contact: {
            mobile1: faker.phone.phoneNumber("+## ###/########"),
            email1: faker.internet.email(),
        }
    };
}

function createProduct(productId) {
    return {
        productId,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        color: faker.commerce.color(),
        material: faker.commerce.productMaterial(),
        imageUrl: `https://placeimg.com/640/480/tech?p=${productId}`,
        price: parseFloat(faker.commerce.price()),
    };
}

function createOrder(orderId, customerId, products) {
    const positions = [];
    const numberPos = Math.trunc(Math.random() * MAX_POS_PER_ORDER + 1)
    let totalPrice = 0;
    for (let i = 0; i < numberPos; i++) {
        const quantity = Math.trunc(Math.random() * 6)
        const randomProductIndex = Math.trunc(Math.random() * products.length)
        const product = products[randomProductIndex];
        positions.push({
            orderPos: i + 1,
            productId: product.productId,
            price: product.price,
            quantity,
        });
        totalPrice += product.price * quantity;
    }

    return {
        orderId,
        customerId,
        totalPrice,
        positions,
    }
}

main();
