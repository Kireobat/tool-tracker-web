import { reportApi } from "$lib/api/apiClient";
import { ResponseError, type ToolTrackerResponseDto, type CreateDamageReportDto, type DamageReportDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const createReport = async (createDamageReportDto: CreateDamageReportDto): Promise<DamageReportDto> => {

    try {
        const res = await reportApi.createReport({ createDamageReportDto: createDamageReportDto });

        addFeedback({
                title: "Success",
                message: "Created report successfully.",
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