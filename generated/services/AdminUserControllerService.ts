/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUserLoginRequest } from '../models/AdminUserLoginRequest';
import type { BaseResponse_AdminUserVO_ } from '../models/BaseResponse_AdminUserVO_';
import type { BaseResponse_Page_GemallUserVO_ } from '../models/BaseResponse_Page_GemallUserVO_';
import type { GemallUserQueryRequest } from '../models/GemallUserQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { AdminUserRegisterRequest } from "../models/AdminUserRegisterRequest";

export class AdminUserControllerService {

    /**
     * getUserList
     * @returns BaseResponse_Page_GemallUserVO_ OK
     * @returns any Created
     * @throws ApiError
     * @param jobNumber
     * @param current
     * @param pageSize
     */
    public static getUserListUsingPost(
    jobNumber:string,
    current?: number,
    pageSize?: number
): CancelablePromise<BaseResponse_Page_GemallUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/list',
            query: {
                "jobNumber":jobNumber,
                "current": current,
                "pageSize": pageSize
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * login
     * @param loginRequest loginRequest
     * @returns BaseResponse_AdminUserVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginUsingPost(
loginRequest: AdminUserLoginRequest,
): CancelablePromise<BaseResponse_AdminUserVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/token',
            body: loginRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * logout
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static logoutUsingPost(
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/user/logout',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }


    /**
     * updatePostPost
     * @returns BaseResponse_Page_GemallUserVO_ OK
     * @returns any Created
     * @throws ApiError
     * @param registerRequest
     */
    public static registerPostPost(
      registerRequest: AdminUserRegisterRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: "/user/register",
            body:registerRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
