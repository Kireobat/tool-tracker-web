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
/**
 * 
 * @export
 * @interface PatchLendingAgreementDto
 */
export interface PatchLendingAgreementDto {
    /**
     * ID of the lending agreement to be patched
     * @type {number}
     * @memberof PatchLendingAgreementDto
     */
    id: number;
    /**
     * ID of the tool being lent out
     * @type {number}
     * @memberof PatchLendingAgreementDto
     */
    toolId?: number;
    /**
     * ID of the borrower
     * @type {number}
     * @memberof PatchLendingAgreementDto
     */
    borrowerId?: number;
    /**
     * Time when the lending starts
     * @type {Date}
     * @memberof PatchLendingAgreementDto
     */
    lendingStartTime?: Date;
    /**
     * Expected return time for the tool
     * @type {Date}
     * @memberof PatchLendingAgreementDto
     */
    expectedReturnTime?: Date;
    /**
     * Actual return time for the tool
     * @type {Date}
     * @memberof PatchLendingAgreementDto
     */
    returnTime?: Date;
}

/**
 * Check if a given object implements the PatchLendingAgreementDto interface.
 */
export function instanceOfPatchLendingAgreementDto(value: object): value is PatchLendingAgreementDto {
    if (!('id' in value) || value['id'] === undefined) return false;
    return true;
}

export function PatchLendingAgreementDtoFromJSON(json: any): PatchLendingAgreementDto {
    return PatchLendingAgreementDtoFromJSONTyped(json, false);
}

export function PatchLendingAgreementDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchLendingAgreementDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'toolId': json['toolId'] == null ? undefined : json['toolId'],
        'borrowerId': json['borrowerId'] == null ? undefined : json['borrowerId'],
        'lendingStartTime': json['lendingStartTime'] == null ? undefined : (new Date(json['lendingStartTime'])),
        'expectedReturnTime': json['expectedReturnTime'] == null ? undefined : (new Date(json['expectedReturnTime'])),
        'returnTime': json['returnTime'] == null ? undefined : (new Date(json['returnTime'])),
    };
}

export function PatchLendingAgreementDtoToJSON(json: any): PatchLendingAgreementDto {
    return PatchLendingAgreementDtoToJSONTyped(json, false);
}

export function PatchLendingAgreementDtoToJSONTyped(value?: PatchLendingAgreementDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'toolId': value['toolId'],
        'borrowerId': value['borrowerId'],
        'lendingStartTime': value['lendingStartTime'] == null ? undefined : ((value['lendingStartTime']).toISOString()),
        'expectedReturnTime': value['expectedReturnTime'] == null ? undefined : ((value['expectedReturnTime']).toISOString()),
        'returnTime': value['returnTime'] == null ? undefined : ((value['returnTime']).toISOString()),
    };
}

