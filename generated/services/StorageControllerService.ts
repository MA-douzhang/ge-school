/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Resource } from '../models/Resource';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StorageControllerService {

    /**
     * download
     * @param key key
     * @returns Resource OK
     * @throws ApiError
     */
    public static downloadUsingGet(
key: string,
): CancelablePromise<Resource> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/storage/download/{key}',
            path: {
                'key': key,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * fetch
     * @param key key
     * @returns Resource OK
     * @throws ApiError
     */
    public static fetchUsingGet(
key: string,
): CancelablePromise<Resource> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/storage/fetch/{key}',
            path: {
                'key': key,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * upload
     * @param file 
     * @returns any OK
     * @throws ApiError
     */
    public static uploadUsingPost(
file?: Blob,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/storage/upload',
            formData: {
                'file': file,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
