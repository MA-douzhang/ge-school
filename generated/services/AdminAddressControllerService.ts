/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_GemallAddressVO_ } from '../models/BaseResponse_Page_GemallAddressVO_';
import type { GemallAddressQueryRequest } from '../models/GemallAddressQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminAddressControllerService {

    /**
     * getAddressList
     * @param queryRequest queryRequest
     * @param userId userId
     * @returns BaseResponse_Page_GemallAddressVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getAddressListUsingPost(
queryRequest: GemallAddressQueryRequest,
userId?: number,
): CancelablePromise<BaseResponse_Page_GemallAddressVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/address/list',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
