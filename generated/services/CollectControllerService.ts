/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CollectControllerService {

    /**
     * addordelete
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static addordeleteUsingPost(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/collect/addordelete',
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
     * @param type type
     * @param limit limit
     * @param order order
     * @param page page
     * @param sort sort
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet2(
type: number,
limit: number = 10,
order: string = 'desc',
page: number = 1,
sort: string = 'add_time',
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/collect/list',
            query: {
                'limit': limit,
                'order': order,
                'page': page,
                'sort': sort,
                'type': type,
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
