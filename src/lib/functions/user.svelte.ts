import type { UserDto } from "$lib/generated/tool-tracker";

export const user: { current: UserDto | undefined } = $state({ current: undefined })