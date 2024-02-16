/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { GemallUserQueryRequest } from "../models/GemallUserQueryRequest";
import { BaseResponse_Page_GemallUserVO_ } from "../models/BaseResponse_Page_GemallUserVO_";

export class ImgControllerService {

  /**
   * list
   * @returns any OK
   * @throws ApiError
   * @param current
   * @param pageSize
   */
  public static listUsingAdminGet(
    current?: number,
    pageSize?: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/img/admin/list",
      query: {
        "current": current,
        "pageSize": pageSize
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }
  /**
   * list
   * @returns any OK
   * @throws ApiError
   * @param current
   * @param pageSize
   */
  public static listUsingGet(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/img/list",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }
  /**
   * getUserList
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param id
   */
  public static updateStatuePost(
    id?: number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/img/updateStatue",
      body: { "id":id },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
