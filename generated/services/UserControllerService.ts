/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * list
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet9(
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/getUser',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
