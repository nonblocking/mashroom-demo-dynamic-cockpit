

export type SearchResult = {
    hits: SearchHits;
    total: number;
}

export type SearchHit = SearchHitCustomer | SearchHitProduct;
export type SearchHits = Array<SearchHit>;

export type SearchHitCustomer = {
    type: "Customer";
    customerId: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    prefix: string | undefined;
    suffix: string | undefined;
    city: string;
    zipCode: string;
    streetAddress: string;
}

export type SearchHitProduct = {
    type: "Product";
    productId: string;
    name: string;
    color: string;
    material: string;
    price: number;
}

export type SearchHitOrder = {
    type: "Order";
    orderId: string;
    customerId: string;
    date: string;
    totalPrice: number;
}

export type Customer = {
    customerId: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
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
    date: string;
    totalPrice: number;
    positions: Array<OrderPos>
}

export type OrderPos = {
    orderPos: number;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
}

export type Bestseller = {
    rank: number;
    productId: string;
    productName: string;
}

export type Bestsellers = Array<Bestseller>;
