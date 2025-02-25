export const statusTypes = ["On Going", "Completed", "Awaiting", "Idea"] as const;
export type Status = typeof statusTypes[number];