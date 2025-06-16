import { typeApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type ToolTypeDto } from "$lib/generated/tool-tracker";


export const createType = async (name: string): Promise<ToolTypeDto> => {

    try {
        const res = await typeApi.createToolType({ name: name });
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