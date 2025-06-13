import { roleApi } from "$lib/api/apiClient";
import { ResponseError, type UserDto, type ToolTrackerResponseDto } from "$lib/generated/tool-tracker";


export const getRoleById = async (id: number): Promise<RoleDto> => {
    try {
        return await roleApi.getRole({ id });
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