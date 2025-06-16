import { feeApi } from "$lib/api/apiClient";
import { ResponseError, type CreateFeeDto, type FeeDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const createFee = async (createFeeDto: CreateFeeDto): Promise<FeeDto> => {

    try {
        const res = await feeApi.createFee({ createFeeDto: createFeeDto });

addFeedback({
                title: "Success",
                message: "Created fee successfully.",
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