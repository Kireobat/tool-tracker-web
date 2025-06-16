import { agreementApi } from "$lib/api/apiClient";
import { ResponseError, type CreateLendingAgreementDto, type LendingAgreementDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const createAgreement = async (createLendingAgreementDto: CreateLendingAgreementDto): Promise<LendingAgreementDto> => {

    try {
        const res = await agreementApi.createAgreement({ createLendingAgreementDto: createLendingAgreementDto });

        addFeedback({
                title: "Success",
                message: "Created lending agreement successfully.",
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