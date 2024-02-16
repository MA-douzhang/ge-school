/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { GemallUserQueryRequest } from "../models/GemallUserQueryRequest";
import { BaseResponse_Page_GemallUserVO_ } from "../models/BaseResponse_Page_GemallUserVO_";

export class QuestionControllerService {

  /**
   * list
   * @returns any OK
   * @throws ApiError
   * @param partitionId
   * @param current
   * @param pageSize
   */
  public static listUsingAdminGet(
    current?: number,
    pageSize?: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/question/admin/list",
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
   * @param partitionId
   * @param current
   * @param pageSize
   */
  public static listUsingGet(
    current?: number,
    pageSize?: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/question/list",
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
      url: "/question/updateStatue",
      body: { "id":id },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * saveQuestionQuestion
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param title
   * @param content
   * @param partitionId
   */
  public static saveQuestionPost(
    title?: string,
    content?: string,

  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/question/save",
      body: { "title":title,"content":content},
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateQuestionQuestion
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param id
   * @param title
   * @param content
   * @param partitionId
   */
  public static updateQuestionPost(
    id?:string,
    title?: string,
    content?: string,

  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/question/update",
      body: { "id":id,"title":title,"content":content},
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
  public static getQuestionByIdGet(
    id?:number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/question/getQuestion",
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

  /**
   * updateQuestionQuestion
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param id
   * @param title
   * @param content
   * @param partitionId
   */
  public static doThumbQuestionPost(
    id?:string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/question/doThumb",
      body: { "id":id},
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
  public static deleteQuestionByIdPost(
    id?:number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/question/admin/delete",
      body: {
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

