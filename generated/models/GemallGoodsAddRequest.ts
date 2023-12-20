/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GemallGoods } from './GemallGoods';
import type { GemallGoodsAttribute } from './GemallGoodsAttribute';
import type { GemallGoodsProduct } from './GemallGoodsProduct';
import type { GemallGoodsSpecification } from './GemallGoodsSpecification';

export type GemallGoodsAddRequest = {
    attributes?: Array<GemallGoodsAttribute>;
    goods?: GemallGoods;
    products?: Array<GemallGoodsProduct>;
    specifications?: Array<GemallGoodsSpecification>;
};
