import { serviceEventApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerPageDtoToolServiceEventDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getServiceEvents = async (page: number, size: number, sort: string[], toolId?: number, lendingAgreementId?: number, searchPeriodStart?: Date, searchPeriodStop?: Date): Promise<ToolTrackerPageDtoToolServiceEventDto> => {
    try {
        return await serviceEventApi.getServiceEvents({ page, size, sort, toolId, lendingAgreementId, searchPeriodStart, searchPeriodStop});
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