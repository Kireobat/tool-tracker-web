import { agreementApi } from "$lib/api/apiClient";
import { ResponseError, type LendingAgreementDto, type PatchLendingAgreementDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const patchAgreement = async (patchLendingAgreementDto: PatchLendingAgreementDto ): Promise<LendingAgreementDto> => {

    try {
        const res = await agreementApi.patchAgreement({ patchLendingAgreementDto: patchLendingAgreementDto });
        addFeedback({
                title: "Success",
                message: "Patched agreement successfully.",
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