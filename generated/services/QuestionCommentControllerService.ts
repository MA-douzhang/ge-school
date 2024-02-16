/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { GemallUserQueryRequest } from "../models/GemallUserQueryRequest";
import { BaseResponse_Page_GemallUserVO_ } from "../models/BaseResponse_Page_GemallUserVO_";

export class QuestionCommentControllerService {

  /**
   * list
   * @returns any OK
   * @throws ApiError
   * @param questionId
   * @param current
   * @param pageSize
   */
  public static listUsingAdminGet(
    questionId?:number,
    current?: number,
    pageSize?: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/questionComment/admin/list",
      query: {
        "questionId":questionId,
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
   * @param questionId
   * @param current
   * @param pageSize
   */
  public static listUsingGet(
    questionId?:number,
    current?: number,
    pageSize?: number
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/questionComment/list",
      query: {
        "questionId":questionId,
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
      url: "/questionComment/updateStatue",
      body: { "id":id },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * saveQuestionCommentPost
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param title
   * @param content
   * @param questionId
   */
  public static saveQuestionCommentPost(
    title?: string,
    content?: string,
    questionId?: number,

  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/questionComment/save",
      body: { "title":title,"content":content,"questionId":questionId},
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateQuestionCommentQPost
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param id
   * @param title
   * @param content
   * @param questionId
   */
  public static updateQuestionCommentPost(
    id?:string,
    title?: string,
    content?: string,
    questionId?: number,

  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/questionComment/update",
      body: { "id":id,"title":title,"content":content,"questionId":questionId},
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
  public static getQuestionCommentByIdGet(
    id?:number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/questionComment/getQuestionComment",
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
   * updateQuestionCommentPost
   * @returns BaseResponse_Page_GemallUserVO_ OK
   * @returns any Created
   * @throws ApiError
   * @param id
   * @param title
   * @param content
   * @param partitionId
   */
  public static doThumbQuestionCommentPost(
    id?:string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: "/questionComment/doThumb",
      body: { "id":id},
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}

