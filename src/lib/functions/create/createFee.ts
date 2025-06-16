import { feeApi } from "$lib/api/apiClient";
import { ResponseError, type CreateFeeDto, type FeeDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const createFee = async (createFeeDto: CreateFeeDto): Promise<FeeDto> => {

    try {
        const res = await feeApi.createFee({ createFeeDto: createFeeDto });
        return res;
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