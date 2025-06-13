import { authApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


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