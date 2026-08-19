/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
export type AuthResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
};

