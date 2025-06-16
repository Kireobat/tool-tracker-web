import { authApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const isEmployee = async (): Promise<boolean> => {
    try {
        return await authApi.isEmployee();
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as ToolTrackerResponseDto;
            addFeedback({
                                        title: "Error",
                                        message: res.message,
                                        type: "error"
                                    });
            return false;
        } else {
            console.error(error);
            return false;
        }
    }
}