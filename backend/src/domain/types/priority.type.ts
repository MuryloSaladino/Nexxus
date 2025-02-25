export const priorityTypes = ["Low", "Medium", "High"] as const;
export type Priority = typeof priorityTypes[number];