import { feeApi } from "$lib/api/apiClient";
import {ResponseError, type FeeDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getFeeById = async (id: number): Promise<FeeDto> => {
    try {
        return await feeApi.getTool1({ id });
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as ToolTrackerResponseDto;

            throw res;
        } else {
            console.error(error);
            throw error;
        }
    }
}