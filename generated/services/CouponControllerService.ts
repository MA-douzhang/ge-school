/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CouponControllerService {

    /**
     * exchange
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static exchangeUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/coupon/exchange',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * list
     * @param limit limit
     * @param order order
     * @param page page
     * @param sort sort
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet3(
limit: number = 10,
order: string = 'desc',
page: number = 1,
sort: string = 'add_time',
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/coupon/list',
            query: {
                'limit': limit,
                'order': order,
                'page': page,
                'sort': sort,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * mylist
     * @param limit limit
     * @param order order
     * @param page page
     * @param sort sort
     * @param status status
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static mylistUsingGet(
limit: number = 10,
order: string = 'desc',
page: number = 1,
sort: string = 'add_time',
status?: number,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/coupon/mylist',
            query: {
                'limit': limit,
                'order': order,
                'page': page,
                'sort': sort,
                'status': status,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * receive
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static receiveUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/coupon/receive',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * selectlist
     * @param cartId cartId
     * @param grouponRulesId grouponRulesId
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static selectlistUsingGet(
cartId?: number,
grouponRulesId?: number,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/coupon/selectlist',
            query: {
                'cartId': cartId,
                'grouponRulesId': grouponRulesId,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
