import { useEffect, useState } from "react";

function useFetchDetailed(url) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return;
        async function getDetails() {
            try {
                setLoading(true)
                const res = await fetch(url);
                const res2 = await res.json();
                setData(res2);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }

        }
        getDetails();

    }, [url]);

    return { data, loading, error, setError };
}

export default useFetchDetailed;