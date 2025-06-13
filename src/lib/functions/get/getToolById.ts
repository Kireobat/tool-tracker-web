import { toolApi } from "$lib/api/apiClient";
import { ResponseError, type ToolDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getToolById = async (id: number): Promise<ToolDto> => {
    try {
        return await toolApi.getTool({ id });
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