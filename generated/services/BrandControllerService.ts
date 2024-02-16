/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BrandControllerService {

    /**
     * detail
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static detailUsingGet2(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/brand/detail',
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
     * list
     * @param limit limit
     * @param order order
     * @param page page
     * @param sort sort
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet1(
limit: number = 10,
order: string = 'desc',
page: number = 1,
sort: string = 'add_time',
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/brand/list',
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

}
