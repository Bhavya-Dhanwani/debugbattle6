/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
export type Order = {
    _id: string;
    user: string;
    items: Array<OrderItem>;
    totalAmount: number;
    status: Order.status;
    createdAt?: string;
    updatedAt?: string;
};
export namespace Order {
    export enum status {
        PENDING = 'pending',
        PROCESSING = 'processing',
        SHIPPED = 'shipped',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
}

