/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GemallCart } from '../models/GemallCart';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CartControllerService {

    /**
     * add
     * @param cart cart
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static addUsingPost(
cart: GemallCart,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/add',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * checked
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static checkedUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/checked',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * checkout
     * @param addressId addressId
     * @param cartId cartId
     * @param couponId couponId
     * @param grouponRulesId grouponRulesId
     * @param userCouponId userCouponId
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static checkoutUsingGet(
addressId?: number,
cartId?: number,
couponId?: number,
grouponRulesId?: number,
userCouponId?: number,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/checkout',
            query: {
                'addressId': addressId,
                'cartId': cartId,
                'couponId': couponId,
                'grouponRulesId': grouponRulesId,
                'userCouponId': userCouponId,
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
     * delete
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingPost1(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/delete',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * fastadd
     * @param cart cart
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static fastaddUsingPost(
cart: GemallCart,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/fastadd',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * goodscount
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static goodscountUsingGet(
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/goodscount',
            query: {
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
     * index
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static indexUsingGet(
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/index',
            query: {
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
     * update
     * @param cart cart
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPost1(
cart: GemallCart,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/update',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
