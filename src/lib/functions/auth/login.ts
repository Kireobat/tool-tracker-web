import { userApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type LoginDto } from "$lib/generated/tool-tracker";

export const login = async (loginDto: LoginDto): Promise<ToolTrackerResponseDto> => {
    try {
        const res = await userApi.login({ loginDto: loginDto });
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