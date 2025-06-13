import { feeApi } from "$lib/api/apiClient";
import { FeeDtoStatusEnum, ResponseError, type ToolTrackerPageDtoFeeDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getFees = async (page: number, size: number, sort: string[], lendingAgreementId?: number, borrowerId?: number, status?: FeeDtoStatusEnum, feeAmountMin?: number, feeAmountMax?: number): Promise<ToolTrackerPageDtoFeeDto> => {
    try {
        return await feeApi.getFees({ page, size, sort, lendingAgreementId, borrowerId, status, feeAmountMin, feeAmountMax });
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