import { userApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type LoginDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";

export const login = async (loginDto: LoginDto): Promise<ToolTrackerResponseDto> => {
    try {
        const res = await userApi.login({ loginDto: loginDto });

        addFeedback({
                title: "Success",
                message: "logged in.",
                type: "success"
            });
        return res;
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as ToolTrackerResponseDto;

addFeedback({
                            title: "Error",
                            message: res.message,
                            type: "error"
                        });

            throw res;
        } else {
            console.error(error);
            throw error;
        }
    }
}