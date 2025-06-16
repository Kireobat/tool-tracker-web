export const feedback: { current: Feedback[] } = $state({ current: [] })

export function addFeedback(feedbackItem: Omit<Feedback, 'id'>) {
    const newFeedback: Feedback = {
        ...feedbackItem,
        id: crypto.randomUUID() // Generate unique ID
    };
    feedback.current.push(newFeedback);
}

export function removeFeedback(id: string) {
    const index = feedback.current.findIndex(element => element.id === id);
    if (index !== -1) {
        feedback.current.splice(index, 1);
    }
}