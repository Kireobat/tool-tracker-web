import { agreementApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerPageDtoLendingAgreementDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getAgreements = async (page: number, size: number, sort: string[], toolId?: number, borrowerId?: number, lentAfter?: Date, lentBefore?: Date): Promise<ToolTrackerPageDtoLendingAgreementDto> => {
    try {
        return await agreementApi.getAgreements({ page, size, sort, toolId, borrowerId, lentAfter, lentBefore});
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