/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GemallFeedback } from '../models/GemallFeedback';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FeedbackControllerService {

    /**
     * submit
     * @param feedback feedback
     * @param userId userId
     * @returns any OK
     * @throws ApiError
     */
    public static submitUsingPost(
feedback: GemallFeedback,
userId?: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/feedback/submit',
            body: userId,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
