/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { GemallUserQueryRequest } from "../models/GemallUserQueryRequest";
import { BaseResponse_Page_GemallUserVO_ } from "../models/BaseResponse_Page_GemallUserVO_";

export class PostControllerService {

  /**
   * list
   * @returns any OK
   * @throws ApiError
   * @param partitionId
   * @param current
   * @param pageSize
   */
  public static listUsingAdminGet(
    partitionId?:number,
    current?: number,
    pageSize?: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/post/admin/list",
      query: {
        "partitionId":partitionId,
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
   * @param partitionId
   * @param current
   * @param pageSize
   */
  public static listUsingGet(
    partitionId?:number,
    current?: number,
    pageSize?: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/post/list",
      query: {
        "partitionId":partitionId,
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
      url: "/post/updateStatue",
      body: { "id":id },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * savePostPost
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param title
   * @param content
   * @param partitionId
   */
  public static savePostPost(
    title?: string,
    content?: string,
    partitionId?: number,

  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/post/save",
      body: { "title":title,"content":content,"partitionId":partitionId},
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updatePostPost
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param id
   * @param title
   * @param content
   * @param partitionId
   */
  public static updatePostPost(
    id?:string,
    title?: string,
    content?: string,
    partitionId?: number,

  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/post/update",
      body: { "id":id,"title":title,"content":content,"partitionId":partitionId},
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * list
   * @returns any OK
   * @throws ApiError
   * @param id
   */
  public static getPostByIdGet(
    id?:number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/post/getPost",
      query: {
        "id":id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`
      }
    });
  }

}

