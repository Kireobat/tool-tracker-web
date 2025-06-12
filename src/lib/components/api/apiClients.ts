import { FeeEndpointsApi, AuthEndpointsApi, RoleEndpointsApi, ToolEndpointsApi, UserEndpointsApi, ToolTypeEndpointsApi, DamageReportEndpointsApi, LendingAgreementEndpointsApi, ToolServiceEventEndpointsApi } from "$lib/generated/tool-tracker";
import { Configuration } from "$lib/generated/tool-tracker/runtime";
import { envVariables } from "$lib/util/envVariables";

const config = new Configuration({
    basePath: envVariables.backendUrl(),
    credentials: "include"
});

export const authApi = new AuthEndpointsApi(config);
export const userApi = new UserEndpointsApi(config);
export const feeApi = new FeeEndpointsApi(config);
export const roleApi = new RoleEndpointsApi(config);
export const toolApi = new ToolEndpointsApi(config);
export const typeApi = new ToolTypeEndpointsApi(config);
export const reportApi = new DamageReportEndpointsApi(config);
export const agreementApi = new LendingAgreementEndpointsApi(config);
export const serviceEventApi = new ToolServiceEventEndpointsApi(config);