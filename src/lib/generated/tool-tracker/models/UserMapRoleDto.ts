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
 * @interface UserMapRoleDto
 */
export interface UserMapRoleDto {
    /**
     * 
     * @type {number}
     * @memberof UserMapRoleDto
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof UserMapRoleDto
     */
    userId: number;
    /**
     * 
     * @type {number}
     * @memberof UserMapRoleDto
     */
    roleId: number;
    /**
     * 
     * @type {number}
     * @memberof UserMapRoleDto
     */
    createdById: number;
    /**
     * 
     * @type {Date}
     * @memberof UserMapRoleDto
     */
    createdTime: Date;
    /**
     * 
     * @type {number}
     * @memberof UserMapRoleDto
     */
    modifiedById?: number;
    /**
     * 
     * @type {Date}
     * @memberof UserMapRoleDto
     */
    modifiedTime?: Date;
}

/**
 * Check if a given object implements the UserMapRoleDto interface.
 */
export function instanceOfUserMapRoleDto(value: object): value is UserMapRoleDto {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('userId' in value) || value['userId'] === undefined) return false;
    if (!('roleId' in value) || value['roleId'] === undefined) return false;
    if (!('createdById' in value) || value['createdById'] === undefined) return false;
    if (!('createdTime' in value) || value['createdTime'] === undefined) return false;
    return true;
}

export function UserMapRoleDtoFromJSON(json: any): UserMapRoleDto {
    return UserMapRoleDtoFromJSONTyped(json, false);
}

export function UserMapRoleDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserMapRoleDto {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'userId': json['userId'],
        'roleId': json['roleId'],
        'createdById': json['createdById'],
        'createdTime': (new Date(json['createdTime'])),
        'modifiedById': json['modifiedById'] == null ? undefined : json['modifiedById'],
        'modifiedTime': json['modifiedTime'] == null ? undefined : (new Date(json['modifiedTime'])),
    };
}

export function UserMapRoleDtoToJSON(json: any): UserMapRoleDto {
    return UserMapRoleDtoToJSONTyped(json, false);
}

export function UserMapRoleDtoToJSONTyped(value?: UserMapRoleDto | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'userId': value['userId'],
        'roleId': value['roleId'],
        'createdById': value['createdById'],
        'createdTime': ((value['createdTime']).toISOString()),
        'modifiedById': value['modifiedById'],
        'modifiedTime': value['modifiedTime'] == null ? undefined : ((value['modifiedTime']).toISOString()),
    };
}

