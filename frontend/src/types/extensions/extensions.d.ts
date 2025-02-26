export {}

declare global {
    interface String {
        /**
         * Abbreviates a string to exactly two uppercase letters.
         * - If the string has multiple words, takes the first letter of the first two words.
         * - If the string has one word, takes the first two letters.
         * - Pads with "_" if fewer than two characters are available.
         * 
         *  @returns {string} The two-letter abbreviation.
         */
        abreviate(): string;
        /**
         * Replaces the params in the string with the given params object.
         * - Params format: ":[param name]"
         *  @returns {string} A string with params replaced.
         * 
         *  @example 
         * ```tsx
         * "/path/:id".params({ id: "42" })
         * // => "/path/42"
         * ```
         */
        params(params: { [key: string]: string | number }): string;
    }
}
