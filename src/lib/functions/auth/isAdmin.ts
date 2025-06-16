import { authApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto} from "$lib/generated/tool-tracker";
import { addFeedback, feedback } from "../feedback.svelte";

export const isAdmin = async (): Promise<boolean> => {
    try {
        return await authApi.isAdmin();
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as ToolTrackerResponseDto;
            addFeedback({
                                        title: "Error",
                                        message: res.message,
                                        type: "error"
                                    })
            return false;
        } else {
            console.error(error);
            return false;
        }
    }
}