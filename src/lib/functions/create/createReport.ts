import { reportApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type CreateDamageReportDto, type DamageReportDto } from "$lib/generated/tool-tracker";


export const createReport = async (createDamageReportDto: CreateDamageReportDto): Promise<DamageReportDto> => {

    try {
        const res = await reportApi.createReport({ createDamageReportDto: createDamageReportDto });
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