if (!String.prototype.abreviate) {
    String.prototype.abreviate = function (): string {
        const words = this.trim().split(/\s+/)

        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
        }

        const abbreviation = words.slice(0, 2).map(word => word[0]?.toUpperCase() || "").join("");
        return abbreviation.padEnd(2, "_")
    };
}

if (!String.prototype.params) {
    String.prototype.params = function (this: string, params: { [key: string]: string | number }): string {
        let result = this
        Object.keys(params).forEach(key => {
            const value = params[key]
            const regex = new RegExp(":" + key, "g")
            result = result.replace(regex, value.toString())
        })
        return result
    };
}