import { toolApi } from "$lib/api/apiClient";
import { ResponseError, ToolDtoStatusEnum, type ToolTrackerPageDtoToolDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getTools = async (page: number, size: number, sort: string[], name?: string, serial?: string, toolTypeId?: number, status?: ToolDtoStatusEnum): Promise<ToolTrackerPageDtoToolDto> => {
    try {
        return await toolApi.getTools({ page, size, sort, name, serial, toolTypeId, status });
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