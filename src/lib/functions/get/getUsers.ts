import { userApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerPageDtoUserDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getUsers = async (page: number, size: number, sort: string[], name?: string, email?: string): Promise<ToolTrackerPageDtoUserDto> => {
    try {
        return await userApi.getUsers({ page, size, sort, name, email});
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