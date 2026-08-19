/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCartItemDTO } from '../models/AddCartItemDTO';
import type { CartResponse } from '../models/CartResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
    /**
     * Retrieve user's cart
     * Gets the currently authenticated user's shopping cart.
     * @returns CartResponse Cart fetched successfully
     * @throws ApiError
     */
    public static getCart(): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart',
            errors: {
                401: `Not authorized`,
                500: `Server error`,
            },
        });
    }
    /**
     * Add item to cart
     * Adds a product with a specified quantity to the authenticated user's cart.
     * @param requestBody
     * @returns CartResponse Item added to cart successfully
     * @throws ApiError
     */
    public static addItemToCart(
        requestBody: AddCartItemDTO,
    ): CancelablePromise<CartResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request (e.g. invalid product ID or insufficient stock)`,
                401: `Not authorized`,
                500: `Server error`,
            },
        });
    }
}
