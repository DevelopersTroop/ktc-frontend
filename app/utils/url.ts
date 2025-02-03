export function beautifySlug(slug: string) {
    return slug.toLowerCase().replace(",", "").replace(/\s/g, '-');
}

export function buildQueryString(params: { [key: string]: string | undefined }): string {
    const queryString: string[] = [];

    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            const value = params[key];
            if (value !== undefined) {
                queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }
    }

    return queryString.join("&");
}

export function parseQueryString(queryString: string): Record<string, string | string[]> {
    const result: Record<string, string | string[]> = {};

    queryString.split("&").forEach((pair) => {
        const [rawKey, rawValue] = pair.split("=");
        const key = decodeURIComponent(rawKey);
        const value = rawValue !== undefined ? decodeURIComponent(rawValue) : "";

        // Convert comma-separated values into arrays
        if (value.includes(",")) {
            result[key] = value.split(",");
        } else {
            result[key] = value;
        }
    });

    return result;
}
export function parseQueryValuesToArray(value:string){
    const arr = decodeURIComponent(value).split(",")
    for(let item of arr){
        if(item === ""){
            arr.splice(arr.indexOf(item), 1)
        }
    }
    return arr;
}

