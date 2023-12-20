/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GemallOrderVO } from './GemallOrderVO';
import type { OrderItem } from './OrderItem';

export type Page_GemallOrderVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<GemallOrderVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
