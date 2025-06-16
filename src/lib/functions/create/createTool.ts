import { toolApi } from "$lib/api/apiClient";
import { ResponseError, type RegisterToolDto, type ToolTrackerResponseDto, type ToolDto } from "$lib/generated/tool-tracker";


export const createTool = async (registerToolDto: RegisterToolDto): Promise<ToolDto> => {

    try {
        const res = await toolApi.registerTool({ registerToolDto: registerToolDto });
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