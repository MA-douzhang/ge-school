/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_AdminGoodsVO_ } from '../models/BaseResponse_AdminGoodsVO_';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_List_CatVO_ } from '../models/BaseResponse_List_CatVO_';
import type { BaseResponse_Page_GemallGoodsVO_ } from '../models/BaseResponse_Page_GemallGoodsVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { GemallGoodsAddRequest } from '../models/GemallGoodsAddRequest';
import type { GemallGoodsQueryRequest } from '../models/GemallGoodsQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminGoodsControllerService {

    /**
     * getCatList
     * @returns BaseResponse_List_CatVO_ OK
     * @throws ApiError
     */
    public static getCatListUsingGet(): CancelablePromise<BaseResponse_List_CatVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/goods/catAndBrand',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * createGoods
     * @param goodsAllinone goodsAllinone
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static createGoodsUsingPost(
goodsAllinone: GemallGoodsAddRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/goods/create',
            body: goodsAllinone,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteGoods
     * @param deleteRequest deleteRequest
     * @param userId userId
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteGoodsUsingPost(
deleteRequest: DeleteRequest,
userId?: number,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/goods/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * detail
     * @param id id
     * @returns BaseResponse_AdminGoodsVO_ OK
     * @throws ApiError
     */
    public static detailUsingGet1(
id: number,
): CancelablePromise<BaseResponse_AdminGoodsVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/admin/goods/detail',
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
     * getGoodsList
     * @param queryRequest queryRequest
     * @param userId userId
     * @returns BaseResponse_Page_GemallGoodsVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getGoodsListUsingPost(
queryRequest: GemallGoodsQueryRequest,
userId?: number,
): CancelablePromise<BaseResponse_Page_GemallGoodsVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/goods/list',
            body: queryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param goodsAllinone goodsAllinone
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUsingPost(
goodsAllinone: GemallGoodsAddRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/admin/goods/update',
            body: goodsAllinone,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
