import { userApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type RegisterUserDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";

export const register = async (registerUserDto: RegisterUserDto): Promise<ToolTrackerResponseDto> => {
    try {
        const res = await userApi.registerUser({ registerUserDto: registerUserDto });

addFeedback({
                title: "Success",
                message: "registered account.",
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