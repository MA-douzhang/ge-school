/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchControllerService {

    /**
     * clearhistory
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static clearhistoryUsingPost(
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/search/clearhistory',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * helper
     * @param keyword keyword
     * @param limit limit
     * @param page page
     * @returns any OK
     * @throws ApiError
     */
    public static helperUsingGet(
keyword?: string,
limit: number = 10,
page: number = 1,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/search/helper',
            query: {
                'keyword': keyword,
                'limit': limit,
                'page': page,
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
    public static indexUsingGet3(
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/search/index',
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

}
