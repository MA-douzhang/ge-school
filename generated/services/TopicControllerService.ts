/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TopicControllerService {

    /**
     * detail
     * @param id id
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static detailUsingGet5(
id: number,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/topic/detail',
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
     * @param limit limit
     * @param order order
     * @param page page
     * @param sort sort
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet8(
limit: number = 10,
order: string = 'desc',
page: number = 1,
sort: string = 'add_time',
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/topic/list',
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
     * related
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static relatedUsingGet1(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/topic/related',
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
