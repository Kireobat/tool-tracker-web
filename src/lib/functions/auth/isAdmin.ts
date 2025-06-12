import { AuthEndpointsApi } from "$lib/generated/tool-tracker/apis/AuthEndpointsApi";
import { ResponseError, type ToolTrackerResponseDto} from "$lib/generated/tool-tracker";

const authApi = new AuthEndpointsApi();

export const isAdmin = async (): Promise<boolean> => {
    try {
        return await authApi.isAdmin();
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