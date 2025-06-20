import { goto } from "$app/navigation";
import { authApi } from "$lib/api/apiClient";
import { ResponseError, ToolTrackerResponseDtoStatusEnum, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";
import { addFeedback } from "../feedback.svelte";


export const isEmployee = async (disableRedirect?: boolean): Promise<boolean> => {
    try {
        return await authApi.isEmployee();
    } catch (err) {
        if (disableRedirect) {
            return false;
        }
        if (err instanceof ResponseError) {
            const res = await err.response.json() as ToolTrackerResponseDto;
            console.error(res);
            addFeedback({
                title: "Error",
                message: res.message,
                type: "error"
            });

            if (ToolTrackerResponseDtoStatusEnum._401Unauthorized.includes(res.status)) {
                goto(`/error?status=401&message=${encodeURIComponent('Unauthorized: You need to be logged in')}`);
                return false;
            } else if (ToolTrackerResponseDtoStatusEnum._403Forbidden.includes(res.status)) {
                goto(`/error?status=403&message=${encodeURIComponent('Forbidden: You do not have employee access')}`);
                return false;
            } else {
                goto(`/error?status=500&message=${encodeURIComponent(res.message || 'Authentication error')}`);
                return false;
            }
        } else {
            console.error(err);
            goto(`/error?status=500&message=${encodeURIComponent('Authentication error')}`);
            return false;
        }
    }
}