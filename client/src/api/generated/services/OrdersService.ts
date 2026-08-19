/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderListResponse } from '../models/OrderListResponse';
import type { OrderResponse } from '../models/OrderResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Retrieve user's order history
     * Gets all orders placed by the authenticated user.
     * @returns OrderListResponse Order history fetched successfully
     * @throws ApiError
     */
    public static getOrderHistory(): CancelablePromise<OrderListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders',
            errors: {
                401: `Not authorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Place an order
     * Creates a new order using the current items in the user's cart, and clears the cart.
     * @returns OrderResponse Order placed successfully
     * @throws ApiError
     */
    public static placeOrder(): CancelablePromise<OrderResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders',
            errors: {
                400: `Bad request (e.g. cart is empty)`,
                401: `Not authorized`,
                500: `Server error`,
            },
        });
    }
}
