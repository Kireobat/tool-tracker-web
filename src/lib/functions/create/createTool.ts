import { toolApi } from "$lib/api/apiClient";
import { ResponseError, type RegisterToolDto, type ToolTrackerResponseDto, type ToolDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const createTool = async (registerToolDto: RegisterToolDto): Promise<ToolDto> => {

    try {
        const res = await toolApi.registerTool({ registerToolDto: registerToolDto });

        addFeedback({
                title: "Success",
                message: "Created tool successfully.",
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