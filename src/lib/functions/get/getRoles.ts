import { roleApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerPageDtoRoleDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getRoles = async (page: number, size: number, sort: string[], name?: string, description?: string): Promise<ToolTrackerPageDtoRoleDto> => {
    try {
        return await roleApi.getRoles({ page, size, sort, name, description});
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