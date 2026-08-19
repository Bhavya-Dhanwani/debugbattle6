/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponse } from '../models/AuthResponse';
import type { LoginDTO } from '../models/LoginDTO';
import type { RefreshResponse } from '../models/RefreshResponse';
import type { RefreshTokenDTO } from '../models/RefreshTokenDTO';
import type { RegisterDTO } from '../models/RegisterDTO';
import type { SuccessMessageResponse } from '../models/SuccessMessageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Register a new user
     * Register a new user with name, email, and password. Returns user info, accessToken, and refreshToken.
     * @param requestBody
     * @returns AuthResponse User registered successfully
     * @throws ApiError
     */
    public static registerUser(
        requestBody: RegisterDTO,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request or user already exists`,
            },
        });
    }
    /**
     * User login
     * Authenticate user with email and password. Returns user info, accessToken, and refreshToken.
     * @param requestBody
     * @returns AuthResponse Login successful
     * @throws ApiError
     */
    public static loginUser(
        requestBody: LoginDTO,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid credentials`,
            },
        });
    }
    /**
     * Refresh access token
     * Get a new access token and refresh token pair using a valid refresh token.
     * @param requestBody
     * @returns RefreshResponse Access token refreshed successfully
     * @throws ApiError
     */
    public static refreshToken(
        requestBody?: RefreshTokenDTO,
    ): CancelablePromise<RefreshResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired refresh token`,
            },
        });
    }
    /**
     * Log out user
     * Revokes the refresh token and clears auth cookies.
     * @param requestBody
     * @returns SuccessMessageResponse Logged out successfully
     * @throws ApiError
     */
    public static logoutUser(
        requestBody?: RefreshTokenDTO,
    ): CancelablePromise<SuccessMessageResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
}
