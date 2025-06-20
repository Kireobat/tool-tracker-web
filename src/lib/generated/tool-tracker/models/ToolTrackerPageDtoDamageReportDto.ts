/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { DamageReportDto } from './DamageReportDto';
import {
    DamageReportDtoFromJSON,
    DamageReportDtoFromJSONTyped,
    DamageReportDtoToJSON,
    DamageReportDtoToJSONTyped,
} from './DamageReportDto';

/**
 * 
 * @export
 * @interface ToolTrackerPageDtoDamageReportDto
 */
export interface ToolTrackerPageDtoDamageReportDto {
    /**
     * 
     * @type {Array<DamageReportDto>}
     * @memberof ToolTrackerPageDtoDamageReportDto
     */
    page: Array<DamageReportDto>;
    /**
     * 
     * @type {number}
     * @memberof ToolTrackerPageDtoDamageReportDto
     */
    totalItems: number;
    /**
     * 
     * @type {number}
     * @memberof ToolTrackerPageDtoDamageReportDto
     */
    currentPage: number;
    /**
     * 
     * @type {number}
     * @memberof ToolTrackerPageDtoDamageReportDto
     */
    pageSize: number;
    /**
     * 
     * @type {number}
     * @memberof ToolTrackerPageDtoDamageReportDto
     */
    totalPages: number;
    /**
     * 
     * @type {boolean}
     * @memberof ToolTrackerPageDtoDamageReportDto
     */
    hasNextPage: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ToolTrackerPageDtoDamageReportDto
     */
    hasPreviousPage: boolean;
}

/**
 * Check if a given object implements the ToolTrackerPageDtoDamageReportDto interface.
 */
export function instanceOfToolTrackerPageDtoDamageReportDto(value: object): value is ToolTrackerPageDtoDamageReportDto {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('totalItems' in value) || value['totalItems'] === undefined) return false;
    if (!('currentPage' in value) || value['currentPage'] === undefined) return false;
    if (!('pageSize' in value) || value['pageSize'] === undefined) return false;
    if (!('totalPages' in value) || value['totalPages'] === undefined) return false;
    if (!('hasNextPage' in value) || value['hasNextPage'] === undefined) return false;
    if (!('hasPreviousPage' in value) || value['hasPreviousPage'] === undefined) return false;
    return true;
}

export function ToolTrackerPageDtoDamageReportDtoFromJSON(json: any): ToolTrackerPageDtoDamageReportDto {
    return ToolTrackerPageDtoDamageReportDtoFromJSONTyped(json, false);
}

export function ToolTrackerPageDtoDamageReportDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ToolTrackerPageDtoDamageReportDto {
    if (json == null) {
        return json;
    }
    return {
        
        'page': ((json['page'] as Array<any>).map(DamageReportDtoFromJSON)),
        'totalItems': json['totalItems'],
        'currentPage': json['currentPage'],
        'pageSize': json['pageSize'],
        'totalPages': json['totalPages'],
        'hasNextPage': json['hasNextPage'],
        'hasPreviousPage': json['hasPreviousPage'],
    };
}

export function ToolTrackerPageDtoDamageReportDtoToJSON(json: any): ToolTrackerPageDtoDamageReportDto {
    return ToolTrackerPageDtoDamageReportDtoToJSONTyped(json, false);
}

export function ToolTrackerPageDtoDamageReportDtoToJSONTyped(value?: ToolTrackerPageDtoDamageReportDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'page': ((value['page'] as Array<any>).map(DamageReportDtoToJSON)),
        'totalItems': value['totalItems'],
        'currentPage': value['currentPage'],
        'pageSize': value['pageSize'],
        'totalPages': value['totalPages'],
        'hasNextPage': value['hasNextPage'],
        'hasPreviousPage': value['hasPreviousPage'],
    };
}

