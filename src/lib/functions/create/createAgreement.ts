import { agreementApi } from "$lib/api/apiClient";
import { ResponseError, type CreateLendingAgreementDto, type LendingAgreementDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const createAgreement = async (createLendingAgreementDto: CreateLendingAgreementDto): Promise<LendingAgreementDto> => {

    try {
        const res = await agreementApi.createAgreement({ createLendingAgreementDto: createLendingAgreementDto });
        return res;
    } catch (error) {
        if (error instanceof ResponseError) {
            const res = await error.response.json() as ToolTrackerResponseDto;
            throw res;
        } else {
            console.error(error);
            throw error;
        }
    }

}