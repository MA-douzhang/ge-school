/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class IssueControllerService {

    /**
     * list
     * @param order order
     * @param page page
     * @param question question
     * @param size size
     * @param sort sort
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingGet6(
order: string = 'desc',
page: number = 1,
question?: string,
size: number = 10,
sort: string = 'add_time',
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/issue/list',
            query: {
                'order': order,
                'page': page,
                'question': question,
                'size': size,
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
