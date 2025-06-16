interface Feedback {
    id: string;
    type: "error" | "success" | "info" | "warn";
    title: string;
    message: string;
}