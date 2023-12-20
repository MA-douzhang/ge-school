/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GoodsControllerService {

    /**
     * category
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static categoryUsingGet(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goods/category',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * count
     * @returns any OK
     * @throws ApiError
     */
    public static countUsingGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goods/count',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * detail
     * @param id id
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static detailUsingGet3(
id: number,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goods/detail',
            query: {
                'id': id,
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
     * @param brandId brandId
     * @param categoryId categoryId
     * @param isHot isHot
     * @param isNew isNew
     * @param keyword keyword
     * @param limit limit
     * @param order order
     * @param page page
     * @param sort sort
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet5(
brandId?: number,
categoryId?: number,
isHot?: boolean,
isNew?: boolean,
keyword?: string,
limit: number = 10,
order: string = 'desc',
page: number = 1,
sort: string = 'add_time',
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goods/list',
            query: {
                'brandId': brandId,
                'categoryId': categoryId,
                'isHot': isHot,
                'isNew': isNew,
                'keyword': keyword,
                'limit': limit,
                'order': order,
                'page': page,
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
     * related
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static relatedUsingGet(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/goods/related',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
