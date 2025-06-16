import { userApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type RegisterUserDto } from "$lib/generated/tool-tracker";

export const register = async (registerUserDto: RegisterUserDto): Promise<ToolTrackerResponseDto> => {
    try {
        const res = await userApi.registerUser({ registerUserDto: registerUserDto });
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