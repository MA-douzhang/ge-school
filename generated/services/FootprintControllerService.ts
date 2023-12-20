/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FootprintControllerService {

    /**
     * delete
     * @param body body
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingPost2(
body: string,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/footprint/delete',
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
     * @param page page
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet4(
limit: number = 10,
page: number = 1,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/footprint/list',
            query: {
                'limit': limit,
                'page': page,
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
