import { agreementApi } from "$lib/api/apiClient";
import { ResponseError, type LendingAgreementDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getAgreementById = async (id: number): Promise<LendingAgreementDto> => {
    try {
        return await agreementApi.getAgreement({ id});
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