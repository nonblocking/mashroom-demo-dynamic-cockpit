
const {resolve} = require('path');
const {writeJsonSync} = require('fs-extra');
const faker = require('faker');

const NUM_CUSTOMERS = 1000;
const NUM_PRODUCTS = 100;
const NUM_BESTSELLERS = 10;
const MAX_ORDERS_PER_CUSTOMER = 5;
const MAX_POS_PER_ORDER = 5;

const customers = [];
const products = [];
const orders = [];
const bestsellers = [];

function main() {
    for (let i = 0; i < NUM_CUSTOMERS; i++) {
        customers.push(createCustomer(String(i + 1)));
    }
    for (let i = 0; i < NUM_PRODUCTS; i++) {
        products.push(createProduct(String(i + 1)));
    }
    let orderId = 1;
    for (let customer of customers) {
        const numOrders = Math.trunc(Math.random() * MAX_ORDERS_PER_CUSTOMER + 1);
        for (let i = 0; i < numOrders; i++) {
            orders.push(createOrder(String(orderId++), customer.customerId, products));
        }
    }
    for (let i = 0; i < NUM_BESTSELLERS; i++) {
        bestsellers.push(createBestseller(i + 1));
    }

    writeJsonSync(resolve(__dirname, './data/customers.json'), customers);
    writeJsonSync(resolve(__dirname, './data/products.json'), products);
    writeJsonSync(resolve(__dirname, './data/orders.json'), orders);
    writeJsonSync(resolve(__dirname, './data/bestsellers.json'), bestsellers);
}

function createCustomer(customerId) {
    return {
        customerId,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        birthDate: randomBirthDate(),
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
    const date = randomOrderDate();
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
        date,
        totalPrice,
        positions,
    }
}

function createBestseller(rank) {
    const randomProductIndex = Math.trunc(Math.random() * products.length)
    const product = products[randomProductIndex];
    return {
        rank,
        productId: product.productId,
        productName: product.name,
    };
}

function randomBirthDate() {
    const from = new Date('1940-01-01');
    const to = new Date('2010-01-01');
    return faker.date.between(from, to);
}

function randomOrderDate() {
    const from = new Date('2010-01-01');
    const to = new Date();
    return faker.date.between(from, to);
}

main();
