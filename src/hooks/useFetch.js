import { useEffect, useState } from "react";

function useFetch(url) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return;
        async function getDetails() {
            try {
                setLoading(true);
                let response = await fetch(url);
                let response2 = await response.json();
                setData(response2)
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        }

        getDetails();

    }, [url]);

    return { data, loading, error };
}

export default useFetch;
