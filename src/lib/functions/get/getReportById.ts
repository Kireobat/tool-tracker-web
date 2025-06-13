import { reportApi } from "$lib/api/apiClient";
import { ResponseError, type DamageReportDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getReportById = async (id: number): Promise<DamageReportDto> => {
    try {
        return await reportApi.getReport({ id });
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