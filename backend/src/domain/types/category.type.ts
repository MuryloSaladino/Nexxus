export const categoryTypes = ["AI Development", "Test Bench Development", "Smart Pairing"] as const;
export type Category = typeof categoryTypes[number];