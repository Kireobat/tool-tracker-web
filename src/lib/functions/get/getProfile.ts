import { authApi } from "$lib/api/apiClient"
import { ResponseError, type ToolTrackerResponseDto, type UserDto } from "$lib/generated/tool-tracker";

export const getProfile = async (): Promise<UserDto> => {
    try {
        return await authApi.getProfile();
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