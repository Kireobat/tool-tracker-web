import { typeApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerPageDtoToolTypeDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getTypes = async (page: number, size: number, sort: string[], name?: string): Promise<ToolTrackerPageDtoToolTypeDto> => {
    try {
        return await typeApi.getToolTypes({ page, size, sort, name});
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