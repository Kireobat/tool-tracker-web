import { typeApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTypeDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getTypeById = async (id: number): Promise<ToolTypeDto> => {
    try {
        return await typeApi.getToolType({ id });
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