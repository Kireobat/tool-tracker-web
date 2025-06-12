interface EnvVariables {
    backendUrl: () => string
}

export const envVariables: EnvVariables = {
    backendUrl: () =>
        import.meta.env.VITE_BACKEND_URL
}