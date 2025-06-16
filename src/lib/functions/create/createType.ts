import { typeApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type ToolTypeDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const createType = async (name: string): Promise<ToolTypeDto> => {

    try {
        const res = await typeApi.createToolType({ name: name });
        addFeedback({
                title: "Success",
                message: "Created tool type successfully.",
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