/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GemallUserVO } from './GemallUserVO';
import type { OrderItem } from './OrderItem';

export type Page_GemallUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<GemallUserVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
