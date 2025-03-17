class HttpError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = "HttpError";
    }
}

export async function httpRequest<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorText = await response.text();
            throw new HttpError(`HTTP Error: ${response.status} - ${errorText}`, response.status);
        }

        return response.json();
    } catch (error) {
        if (error instanceof HttpError) {
            console.error(`HTTP Request Failed: ${error.message}`);
            throw error;
        } else if (error instanceof TypeError) {
            console.error("Network Error: Server might be down");
            throw new HttpError("Network Error: Server might be down");
        } else {
            console.error("Unexpected Error", error);
            throw new HttpError("Unexpected error occurred");
        }
    }
}