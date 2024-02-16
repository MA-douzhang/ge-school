/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GemallAddressVO } from './GemallAddressVO';
import type { OrderItem } from './OrderItem';

export type Page_GemallAddressVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<GemallAddressVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};
