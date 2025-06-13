import { reportApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerPageDtoDamageReportDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getReports = async (page: number, size: number, sort: string[], lendingAgreementId?: number, toolId?: number): Promise<ToolTrackerPageDtoDamageReportDto> => {
    try {
        return await reportApi.getReports({ page, size, sort, lendingAgreementId, toolId});
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