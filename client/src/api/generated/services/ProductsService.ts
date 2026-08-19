/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDTO } from '../models/CreateProductDTO';
import type { DeleteProductResponse } from '../models/DeleteProductResponse';
import type { ProductListResponse } from '../models/ProductListResponse';
import type { ProductResponse } from '../models/ProductResponse';
import type { UpdateProductDTO } from '../models/UpdateProductDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Get all products
     * Retrieve a list of products, optionally filtered by category or search term.
     * @param category Filter products by category name
     * @param search Search query for product name or description
     * @returns ProductListResponse Products fetched successfully
     * @throws ApiError
     */
    public static getAllProducts(
        category?: string,
        search?: string,
    ): CancelablePromise<ProductListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products',
            query: {
                'category': category,
                'search': search,
            },
            errors: {
                500: `Server error`,
            },
        });
    }
    /**
     * Create a new product (Admin Only)
     * Adds a new product to the catalog.
     * @param requestBody
     * @returns ProductResponse Product created successfully
     * @throws ApiError
     */
    public static createProduct(
        requestBody: CreateProductDTO,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not authorized`,
                403: `Forbidden (Admin only)`,
                500: `Server error`,
            },
        });
    }
    /**
     * Get product by ID
     * Retrieves a single product by its MongoDB ObjectID.
     * @param id MongoDB identifier of the product
     * @returns ProductResponse Product fetched successfully
     * @throws ApiError
     */
    public static getProductById(
        id: string,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Product not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Update product by ID (Admin Only)
     * Updates specified fields for an existing product.
     * @param id MongoDB identifier of the product
     * @param requestBody
     * @returns ProductResponse Product updated successfully
     * @throws ApiError
     */
    public static updateProduct(
        id: string,
        requestBody: UpdateProductDTO,
    ): CancelablePromise<ProductResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Not authorized`,
                403: `Forbidden (Admin only)`,
                404: `Product not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Delete product by ID (Admin Only)
     * Removes a product from the database.
     * @param id MongoDB identifier of the product
     * @returns DeleteProductResponse Product deleted successfully
     * @throws ApiError
     */
    public static deleteProduct(
        id: string,
    ): CancelablePromise<DeleteProductResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Not authorized`,
                403: `Forbidden (Admin only)`,
                404: `Product not found`,
                500: `Server error`,
            },
        });
    }
}
