import { serviceEventApi } from "$lib/api/apiClient";
import { ResponseError, type ToolServiceEventDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getServiceEventById = async (id: number): Promise<ToolServiceEventDto> => {
    try {
        return await serviceEventApi.getServiceEventsById({ id });
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