/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GemallGoodsVO } from './GemallGoodsVO';
import type { OrderItem } from './OrderItem';

export type Page_GemallGoodsVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<GemallGoodsVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
