import { userApi } from "$lib/api/apiClient";
import { ResponseError, type UserDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getUserById = async (id: number): Promise<UserDto> => {
    try {
        return await userApi.getUser({ id });
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