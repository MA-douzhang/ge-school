/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_AdminVendorsVO_ } from '../models/BaseResponse_List_AdminVendorsVO_';
import type { BaseResponse_Page_GemallOrderVO_ } from '../models/BaseResponse_Page_GemallOrderVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { GemallOrderQueryRequest } from '../models/GemallOrderQueryRequest';
import type { GemallOrderShipRequest } from '../models/GemallOrderShipRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminOrderControllerService {

    /**
     * channel
     * @returns BaseResponse_List_AdminVendorsVO_ OK
     * @throws ApiError
     */
    public static channelUsingGet(): CancelablePromise<BaseResponse_List_AdminVendorsVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/order/channel',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteOrder
     * @param deleteRequest deleteRequest
     * @param userId userId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteOrderUsingPost(
deleteRequest: DeleteRequest,
userId?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/order/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getOrderList
     * @param queryRequest queryRequest
     * @param userId userId
     * @returns BaseResponse_Page_GemallOrderVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getOrderListUsingPost(
queryRequest: GemallOrderQueryRequest,
userId?: number,
): CancelablePromise<BaseResponse_Page_GemallOrderVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/order/list',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * ship
     * @param gemallOrderShipRequest gemallOrderShipRequest
     * @param userId userId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static shipUsingPost(
gemallOrderShipRequest: GemallOrderShipRequest,
userId?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/order/ship',
            body: gemallOrderShipRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
