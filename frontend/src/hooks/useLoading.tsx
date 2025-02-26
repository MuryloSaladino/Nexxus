import { useState } from "react";

export default function useLoading<TReturn>(
    asyncCallback: (...args: Parameters<(...args:any) => any>) => Promise<TReturn>
) {
    const [loading, setLoading] = useState(false);

    const loadCallback = async (...args:Parameters<typeof asyncCallback>): Promise<TReturn> => {
        setLoading(true);
        try {
            const response = await asyncCallback(...args);
            return response;
        } finally {
            setLoading(false);
        }
    }

    return { loading, loadCallback }
}