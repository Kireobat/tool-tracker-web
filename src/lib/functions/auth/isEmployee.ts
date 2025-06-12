import { AuthEndpointsApi } from "$lib/generated/tool-tracker/apis/AuthEndpointsApi";
import { ResponseError, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";

const authApi = new AuthEndpointsApi();

export const isEmployee = async (): Promise<boolean> => {
    try {
        return await authApi.isEmployee();
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as ToolTrackerResponseDto;
            return false;
        } else {
            console.error(error);
            return false;
        }
    }
}