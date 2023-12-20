/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderControllerService {

    /**
     * cancel
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static cancelUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/cancel',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * comment
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static commentUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/comment',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * confirm
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static confirmUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/confirm',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * delete
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingPost3(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/delete',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * detail
     * @param orderId orderId
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static detailUsingGet4(
orderId: number,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order/detail',
            query: {
                'orderId': orderId,
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
     * goods
     * @param ogid ogid
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static goodsUsingGet(
ogid: number,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order/goods',
            query: {
                'ogid': ogid,
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
     * list
     * @param limit limit
     * @param order order
     * @param page page
     * @param showType showType
     * @param sort sort
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet7(
limit: number = 10,
order: string = 'desc',
page: number = 1,
showType?: number,
sort: string = 'add_time',
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order/list',
            query: {
                'limit': limit,
                'order': order,
                'page': page,
                'showType': showType,
                'sort': sort,
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
     * pay
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static payUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/pay',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * refund
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static refundUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/refund',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * submit
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static submitUsingPost1(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/submit',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
