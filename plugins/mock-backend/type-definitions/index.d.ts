

export type SearchResult = {
    hits: Array<SearchHit>;
    total: number;
}

export type SearchHit = SearchHitCustomer | SearchHitProduct | SearchHitOrder;

export type SearchHitCustomer = {
    type: "Customer";
    data: Customer;
}

export type SearchHitProduct = {
    type: "Product";
    data: Product;
}

export type SearchHitOrder = {
    type: "Order";
    data: Order;
}

export type Customer = {
    customerId: string;
    firstName: string;
    lastName: string;
    gender: string;
    prefix: string | undefined;
    suffix: string | undefined;
    address: {
        city: string;
        zipCode: string;
        streetAddress: string;
    };
    contact: {
        mobile1: string;
        email1: string;
    }
}

export type Product = {
    productId: string;
    name: string;
    description: string;
    color: string;
    material: string;
    imageUrl: string;
    price: number;
}

export type Order = {
    orderId: string;
    customerId: string;
    totalPrice: number;
    positions: Array<OrderPos>
}

export type OrderPos = {
    orderPos: number;
    productId: string;
    price: number;
    quantity: number;
}

export type Bestseller = {
    rank: number;
    productId: string;
    productName: string;
}

export type Bestsellers = Array<Bestseller>;
