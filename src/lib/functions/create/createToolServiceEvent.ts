import { serviceEventApi } from "$lib/api/apiClient";
import { ResponseError, type CreateToolServiceEventDto, type ToolServiceEventDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const createToolServiceEvent = async (createToolServiceEventDto: CreateToolServiceEventDto): Promise<ToolServiceEventDto> => {

    try {
        const res = await serviceEventApi.createServiceEvent({ createToolServiceEventDto: createToolServiceEventDto });
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